from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from app.catalog import DATASETS, EVALUATION_SAMPLES, MODELS, PREPROCESSING_STEPS, TECH_STACK, WORKFLOW_STEPS
from app.schemas import AuxiliaryConfig, CatalogResponse, DatasetInfo, EvaluationSample, HealthResponse, MetricSet, ModelInfo, PreprocessingStep, ReconstructionResult, ResultMetadata, WorkflowPhase
from app.services.reconstruction import compute_reference_metrics, load_scene, reconstruct_scene, write_result_files

APP_START_TIME = datetime.now(timezone.utc)
BASE_DIR = Path(__file__).resolve().parents[1]
STORAGE_DIR = BASE_DIR / "storage" / "results"
APP_VERSION = "1.0.0"

app = FastAPI(title="SkySweep AI Backend", version=APP_VERSION, description="Free, local FastAPI backend for LISS-IV cloud removal and reconstruction.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup() -> None:
    STORAGE_DIR.mkdir(parents=True, exist_ok=True)


@app.get("/", response_model=HealthResponse)
def root() -> HealthResponse:
    uptime = (datetime.now(timezone.utc) - APP_START_TIME).total_seconds()
    return HealthResponse(
        status="healthy",
        message="SkySweep AI backend is operational",
        version=APP_VERSION,
        uptime_seconds=round(uptime, 2),
    )


@app.get("/api/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return root()


@app.get("/api/models", response_model=list[ModelInfo])
def get_models() -> list[ModelInfo]:
    return [ModelInfo(**model) for model in MODELS]


@app.get("/api/datasets", response_model=list[DatasetInfo])
def get_datasets() -> list[DatasetInfo]:
    return [DatasetInfo(**dataset) for dataset in DATASETS]


@app.get("/api/preprocessing", response_model=list[PreprocessingStep])
def get_preprocessing_steps() -> list[PreprocessingStep]:
    return [PreprocessingStep(**step) for step in PREPROCESSING_STEPS]


@app.get("/api/workflow", response_model=list[WorkflowPhase])
def get_workflow() -> list[WorkflowPhase]:
    return [WorkflowPhase(**phase) for phase in WORKFLOW_STEPS]


@app.get("/api/evaluation/samples", response_model=list[EvaluationSample])
def get_evaluation_samples() -> list[EvaluationSample]:
    return [EvaluationSample(**sample) for sample in EVALUATION_SAMPLES]


@app.get("/api/catalog", response_model=CatalogResponse)
def get_catalog() -> CatalogResponse:
    return CatalogResponse(
        models=[ModelInfo(**model) for model in MODELS],
        datasets=[DatasetInfo(**dataset) for dataset in DATASETS],
        preprocessing=[PreprocessingStep(**step) for step in PREPROCESSING_STEPS],
        workflow=[WorkflowPhase(**phase) for phase in WORKFLOW_STEPS],
        evaluation=[EvaluationSample(**sample) for sample in EVALUATION_SAMPLES],
    )


@app.get("/api/metrics/{model_id}", response_model=MetricSet)
def get_demo_metrics(model_id: str) -> MetricSet:
    model = next((item for item in MODELS if item["id"] == model_id), None)
    if model is None:
        raise HTTPException(status_code=404, detail="Unknown model_id")
    return MetricSet(**model["quality"])


@app.post("/api/reconstruct", response_model=ReconstructionResult)
async def reconstruct_image(
    optical_image: UploadFile = File(...),
    sar_image: UploadFile | None = File(None),
    reference_image: UploadFile | None = File(None),
    selected_model_id: str = Form("swin-transformer", alias="model_id"),
    sentinel1: bool = Form(True),
    sentinel2: bool = Form(False),
    temporalRef: bool = Form(False),
    dem: bool = Form(False),
    cloudMask: bool = Form(True),
) -> ReconstructionResult:
    try:
        auxiliary = AuxiliaryConfig(
            sentinel1=sentinel1,
            sentinel2=sentinel2,
            temporalRef=temporalRef,
            dem=dem,
            cloudMask=cloudMask,
        )

        optical_bytes = await optical_image.read()
        optical_scene = load_scene(optical_bytes, optical_image.filename or "optical.tif")

        sar_scene = None
        if sar_image is not None:
            sar_scene = load_scene(await sar_image.read(), sar_image.filename or "sar.tif")

        reconstruction = reconstruct_scene(optical_scene, selected_model_id, auxiliary, sar_scene)

        if reference_image is not None:
            reference_scene = load_scene(await reference_image.read(), reference_image.filename or "reference.tif")
            reconstruction["metrics"] = compute_reference_metrics(reference_scene.array, reconstruction["reconstructed"])
            reconstruction["metric_mode"] = "reference"

        job_id = uuid4().hex
        artifacts = write_result_files(STORAGE_DIR / job_id, job_id, optical_scene, reconstruction["reconstructed"])

        output_name = Path(artifacts["output_path"]).name
        preview_name = Path(artifacts["preview_path"]).name

        result = ReconstructionResult(
            message="Cloud removal completed successfully",
            optical_filename=optical_image.filename or "optical.tif",
            sar_filename=sar_image.filename if sar_image else "None provided",
            model_id=selected_model_id,
            metric_mode=reconstruction["metric_mode"],
            metrics=reconstruction["metrics"],
            cloud_coverage=round(float(reconstruction["mask"].mean() * 100.0), 2),
            output_filename=output_name,
            preview_filename=preview_name,
            download_url=f"/api/results/{job_id}/download",
            preview_url=f"/api/results/{job_id}/preview",
            job_id=job_id,
            stages=["uploading", "preprocessing", "inference", "postprocessing", "complete"],
            notes=reconstruction["notes"],
            auxiliary=auxiliary,
            extra={
                "artifact_directory": str(STORAGE_DIR / job_id),
                "geometry": "geospatial" if optical_scene.is_geospatial else "image",
                "tech_stack": TECH_STACK,
            },
        )

        metadata = ResultMetadata(
            job_id=job_id,
            created_at=datetime.now(timezone.utc).isoformat(),
            request={
                "optical_filename": optical_image.filename,
                "sar_filename": sar_image.filename if sar_image else None,
                "reference_filename": reference_image.filename if reference_image else None,
                "model_id": selected_model_id,
                "auxiliary": auxiliary.model_dump(),
            },
            result=result,
        )
        (STORAGE_DIR / job_id / f"{job_id}.metadata.json").write_text(metadata.model_dump_json(indent=2), encoding="utf-8")

        return result
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/api/results/{job_id}", response_model=ResultMetadata)
def get_result(job_id: str) -> ResultMetadata:
    metadata_file = STORAGE_DIR / job_id / f"{job_id}.metadata.json"
    if not metadata_file.exists():
        raise HTTPException(status_code=404, detail="Result not found")
    return ResultMetadata.model_validate_json(metadata_file.read_text(encoding="utf-8"))


@app.get("/api/results/{job_id}/download")
def download_result(job_id: str):
    result_dir = STORAGE_DIR / job_id
    metadata_file = result_dir / f"{job_id}.metadata.json"
    if not metadata_file.exists():
        raise HTTPException(status_code=404, detail="Result not found")

    payload = ResultMetadata.model_validate_json(metadata_file.read_text(encoding="utf-8"))
    output_path = result_dir / payload.result.output_filename
    if not output_path.exists():
        raise HTTPException(status_code=404, detail="Output file not found")
    return FileResponse(output_path, filename=output_path.name)


@app.get("/api/results/{job_id}/preview")
def preview_result(job_id: str):
    result_dir = STORAGE_DIR / job_id
    metadata_file = result_dir / f"{job_id}.metadata.json"
    if not metadata_file.exists():
        raise HTTPException(status_code=404, detail="Result not found")

    payload = ResultMetadata.model_validate_json(metadata_file.read_text(encoding="utf-8"))
    preview_path = result_dir / payload.result.preview_filename
    if not preview_path.exists():
        raise HTTPException(status_code=404, detail="Preview file not found")
    return FileResponse(preview_path, filename=preview_path.name)