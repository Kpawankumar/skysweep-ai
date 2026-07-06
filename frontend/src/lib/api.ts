import { API_BASE } from './constants';
import type { ReconstructionResult } from './types';

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
): Promise<ReconstructionResult> {
  const form = new FormData();
  form.append('optical_image', optical);
  if (sar) form.append('sar_image', sar);
  if (modelId) form.append('model_id', modelId);

  const res = await fetch(`${API_BASE}/api/reconstruct`, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export function getDemoMetrics(modelId: string) {
  const metrics: Record<string, { ssim: number; psnr: number; sam: number; fidelity: number }> = {
    'swin-transformer': { ssim: 0.942, psnr: 28.45, sam: 4.2, fidelity: 98.2 },
    'hybrid-cgan': { ssim: 0.918, psnr: 26.82, sam: 5.1, fidelity: 96.4 },
    pix2pix: { ssim: 0.901, psnr: 25.67, sam: 5.8, fidelity: 94.8 },
    cyclegan: { ssim: 0.887, psnr: 24.91, sam: 6.4, fidelity: 93.1 },
    'unet-attention': { ssim: 0.876, psnr: 24.12, sam: 6.9, fidelity: 91.5 },
    diffusion: { ssim: 0.951, psnr: 29.18, sam: 3.6, fidelity: 99.1 },
  };
  return metrics[modelId] ?? metrics['swin-transformer'];
}
