export type ViewMode = 'slider' | 'split';

export type ProcessingStage =
  | 'idle'
  | 'uploading'
  | 'preprocessing'
  | 'inference'
  | 'postprocessing'
  | 'complete';

export interface ReconstructionResult {
  message: string;
  optical_filename: string;
  sar_filename: string;
  model_id: string;
  metric_mode: 'estimated' | 'reference';
  metrics: {
    ssim: number;
    psnr: number;
    sam: number;
    fidelity: number;
  };
  cloud_coverage: number;
  output_filename: string;
  preview_filename: string;
  download_url: string;
  preview_url: string;
  job_id: string;
  stages: ProcessingStage[];
  notes: string[];
  auxiliary: AuxiliaryConfig;
  extra?: Record<string, unknown>;
}

export interface MetricSet {
  ssim: number;
  psnr: number;
  sam: number;
  fidelity: number;
}

export interface ModelInfo {
  id: string;
  name: string;
  tagline: string;
  type: string;
  description: string;
  speed: string;
  params: string;
  color: string;
  quality: MetricSet;
  backend: string;
}

export interface DatasetInfo {
  name: string;
  source: string;
  role: string;
  resolution: string;
  bands: string;
}

export interface PreprocessingStep {
  id: number;
  title: string;
  description: string;
  tools: string[];
  status: 'complete' | 'active' | 'pending';
}

export interface WorkflowPhase {
  phase: string;
  steps: string[];
}

export interface EvaluationSample {
  region: string;
  cloudCover: string;
  improvement: string;
}

export interface BackendCatalog {
  models: ModelInfo[];
  datasets: DatasetInfo[];
  preprocessing: PreprocessingStep[];
  workflow: WorkflowPhase[];
  evaluation: EvaluationSample[];
}

export interface UploadedFileInfo {
  name: string;
  sizeMB: string;
  file: File;
}

export interface AuxiliaryConfig {
  sentinel1: boolean;
  sentinel2: boolean;
  temporalRef: boolean;
  dem: boolean;
  cloudMask: boolean;
}
