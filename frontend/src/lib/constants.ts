export const PROJECT = {
  name: 'SkySweep AI',
  title: 'Generative AI-Based Cloud Removal and Reconstruction for LISS-IV Satellite Imagery',
  subtitle: 'Generative cloud removal framework for satellite imagery',
  region: 'North Eastern Region (NER), India',
};

export const MODELS = [
  {
    id: 'swin-transformer',
    name: 'Swin-Transformer',
    tagline: 'High Fidelity',
    type: 'Transformer',
    description: 'Hierarchical vision transformer with shifted windows for fine-scale spatial detail preservation.',
    ssim: 0.942,
    psnr: 28.45,
    sam: 4.2,
    speed: 'Moderate',
    params: '88M',
    color: '#10b981',
  },
  {
    id: 'hybrid-cgan',
    name: 'Hybrid cGAN',
    tagline: 'Fast Spatial Mapping',
    type: 'GAN',
    description: 'Conditional GAN with SAR-optical fusion encoder for rapid cloud removal inference.',
    ssim: 0.918,
    psnr: 26.82,
    sam: 5.1,
    speed: 'Fast',
    params: '42M',
    color: '#14b8a6',
  },
  {
    id: 'pix2pix',
    name: 'Pix2Pix Generator',
    tagline: 'Paired Translation',
    type: 'GAN',
    description: 'U-Net generator with PatchGAN discriminator for paired cloudy-to-clear translation.',
    ssim: 0.901,
    psnr: 25.67,
    sam: 5.8,
    speed: 'Fast',
    params: '54M',
    color: '#06b6d4',
  },
  {
    id: 'cyclegan',
    name: 'CycleGAN',
    tagline: 'Unpaired Translation',
    type: 'GAN',
    description: 'Cycle-consistency loss enables training without perfectly paired cloud-free references.',
    ssim: 0.887,
    psnr: 24.91,
    sam: 6.4,
    speed: 'Moderate',
    params: '48M',
    color: '#8b5cf6',
  },
  {
    id: 'unet-attention',
    name: 'U-Net + Attention',
    tagline: 'Baseline',
    type: 'CNN',
    description: 'Attention-gated U-Net baseline with multi-spectral channel fusion for cloud reconstruction.',
    ssim: 0.876,
    psnr: 24.12,
    sam: 6.9,
    speed: 'Very Fast',
    params: '31M',
    color: '#f59e0b',
  },
  {
    id: 'diffusion',
    name: 'Diffusion Model',
    tagline: 'Generative Reconstruction',
    type: 'Diffusion',
    description: 'Latent diffusion with temporal conditioning for spectrally consistent cloud-free synthesis.',
    ssim: 0.951,
    psnr: 29.18,
    sam: 3.6,
    speed: 'Slow',
    params: '120M',
    color: '#ec4899',
  },
] as const;

export const PREPROCESSING_STEPS = [
  {
    id: 1,
    title: 'Data Acquisition',
    description: 'Collect cloudy and cloud-free LISS-IV scenes from Bhoonidhi portal for NER study areas.',
    tools: ['Bhoonidhi', 'ISRO LISS-IV'],
    status: 'complete' as const,
  },
  {
    id: 2,
    title: 'Radiometric Correction',
    description: 'Apply DN to TOA reflectance conversion and atmospheric correction for spectral consistency.',
    tools: ['GDAL', 'Rasterio'],
    status: 'complete' as const,
  },
  {
    id: 3,
    title: 'Cloud Mask Generation',
    description: 'Generate cloud and cloud-shadow masks using Fmask algorithm and manual QA refinement.',
    tools: ['OpenCV', 'Scikit-image'],
    status: 'active' as const,
  },
  {
    id: 4,
    title: 'Auxiliary Co-registration',
    description: 'Align Sentinel-1 SAR, Sentinel-2 optical, DEM, and temporal reference imagery to LISS-IV grid.',
    tools: ['GDAL', 'Rasterio', 'QGIS'],
    status: 'pending' as const,
  },
  {
    id: 5,
    title: 'Patch Extraction',
    description: 'Extract 256×256 overlapping patches with Albumentations augmentation for model training.',
    tools: ['Albumentations', 'NumPy'],
    status: 'pending' as const,
  },
  {
    id: 6,
    title: 'Quality Control',
    description: 'Validate co-registration RMSE, mask coverage ratios, and spectral histogram alignment.',
    tools: ['Scikit-image', 'QGIS'],
    status: 'pending' as const,
  },
];

export const WORKFLOW_STEPS = [
  {
    phase: 'Ingestion',
    steps: ['Upload LISS-IV cloudy scene', 'Attach optional SAR/S2/DEM layers', 'Auto-generate cloud mask'],
  },
  {
    phase: 'Processing',
    steps: ['Co-register auxiliary data', 'Select GenAI architecture', 'Run inference pipeline'],
  },
  {
    phase: 'Validation',
    steps: ['Compute SSIM, PSNR, SAM metrics', 'Visual before/after comparison', 'Export analysis-ready GeoTIFF'],
  },
  {
    phase: 'Deployment',
    steps: ['Batch processing queue', 'API endpoint integration', 'Operational monitoring dashboard'],
  },
];

export const DATASETS = [
  { name: 'LISS-IV Optical', source: 'Bhoonidhi / ISRO', role: 'Primary', resolution: '5.8m', bands: '4 (VNIR)' },
  { name: 'Sentinel-1 SAR', source: 'Copernicus', role: 'Auxiliary', resolution: '10m', bands: 'VV/VH' },
  { name: 'Sentinel-2 MSI', source: 'Copernicus', role: 'Auxiliary', resolution: '10m', bands: '13 bands' },
  { name: 'Temporal Reference', source: 'Bhoonidhi Archive', role: 'Auxiliary', resolution: '5.8m', bands: 'Multi-date' },
  { name: 'SRTM DEM', source: 'USGS/NASA', role: 'Auxiliary', resolution: '30m', bands: 'Elevation' },
];

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000';
