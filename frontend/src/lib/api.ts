import { API_BASE } from './constants';
import type {
  AuxiliaryConfig,
  BackendCatalog,
  DatasetInfo,
  EvaluationSample,
  MetricSet,
  ModelInfo,
  PreprocessingStep,
  ReconstructionResult,
  WorkflowPhase,
} from './types';

export async function checkApiHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/`, { signal: AbortSignal.timeout(3000) });
    return res.ok;
  } catch {
    return false;
  }
}

export async function reconstructImage(
  optical: File,
  sar?: File | null,
  modelId?: string,
  auxiliary?: Partial<AuxiliaryConfig>,
  reference?: File | null,
): Promise<ReconstructionResult> {
  const form = new FormData();
  form.append('optical_image', optical);
  if (sar) form.append('sar_image', sar);
  if (modelId) form.append('model_id', modelId);
  if (reference) form.append('reference_image', reference);
  if (auxiliary) {
    form.append('sentinel1', String(auxiliary.sentinel1 ?? true));
    form.append('sentinel2', String(auxiliary.sentinel2 ?? false));
    form.append('temporalRef', String(auxiliary.temporalRef ?? false));
    form.append('dem', String(auxiliary.dem ?? false));
    form.append('cloudMask', String(auxiliary.cloudMask ?? true));
  }

  const res = await fetch(`${API_BASE}/api/reconstruct`, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function fetchBackendCatalog(): Promise<BackendCatalog> {
  const res = await fetch(`${API_BASE}/api/catalog`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function fetchModels(): Promise<ModelInfo[]> {
  const res = await fetch(`${API_BASE}/api/models`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchDatasets(): Promise<DatasetInfo[]> {
  const res = await fetch(`${API_BASE}/api/datasets`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchPreprocessingSteps(): Promise<PreprocessingStep[]> {
  const res = await fetch(`${API_BASE}/api/preprocessing`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchWorkflowPhases(): Promise<WorkflowPhase[]> {
  const res = await fetch(`${API_BASE}/api/workflow`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchEvaluationSamples(): Promise<EvaluationSample[]> {
  const res = await fetch(`${API_BASE}/api/evaluation/samples`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchModelMetrics(modelId: string): Promise<MetricSet> {
  const res = await fetch(`${API_BASE}/api/metrics/${modelId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
