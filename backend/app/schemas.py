from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field


class MetricSet(BaseModel):
    ssim: float
    psnr: float
    sam: float
    fidelity: float


class HealthResponse(BaseModel):
    status: str
    message: str
    version: str
    uptime_seconds: float


class ModelInfo(BaseModel):
    id: str
    name: str
    tagline: str
    type: str
    description: str
    speed: str
    params: str
    color: str
    quality: MetricSet
    backend: str


class DatasetInfo(BaseModel):
    name: str
    source: str
    role: str
    resolution: str
    bands: str


class PreprocessingStep(BaseModel):
    id: int
    title: str
    description: str
    tools: list[str]
    status: Literal["complete", "active", "pending"]


class WorkflowPhase(BaseModel):
    phase: str
    steps: list[str]


class EvaluationSample(BaseModel):
    region: str
    cloudCover: str
    improvement: str


class AuxiliaryConfig(BaseModel):
    sentinel1: bool = True
    sentinel2: bool = False
    temporalRef: bool = False
    dem: bool = False
    cloudMask: bool = True


class ReconstructionResult(BaseModel):
    model_config = ConfigDict(protected_namespaces=())

    message: str
    optical_filename: str
    sar_filename: str
    model_id: str
    metric_mode: Literal["estimated", "reference"]
    metrics: MetricSet
    cloud_coverage: float
    output_filename: str
    preview_filename: str
    download_url: str
    preview_url: str
    job_id: str
    stages: list[str]
    notes: list[str] = Field(default_factory=list)
    auxiliary: AuxiliaryConfig
    extra: dict[str, Any] = Field(default_factory=dict)


class ResultMetadata(BaseModel):
    job_id: str
    created_at: str
    request: dict[str, Any]
    result: ReconstructionResult


class CatalogResponse(BaseModel):
    models: list[ModelInfo]
    datasets: list[DatasetInfo]
    preprocessing: list[PreprocessingStep]
    workflow: list[WorkflowPhase]
    evaluation: list[EvaluationSample]