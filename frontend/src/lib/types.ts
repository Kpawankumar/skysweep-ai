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
  metrics?: {
    ssim: number;
    psnr: number;
    sam: number;
    fidelity: number;
  };
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
