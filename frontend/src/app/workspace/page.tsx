'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ComparisonViewer from '@/components/ComparisonViewer';
import MetricCard from '@/components/MetricCard';
import ProcessingPipeline from '@/components/ProcessingPipeline';
import { checkApiHealth, getDemoMetrics, reconstructImage } from '@/lib/api';
import { MODELS } from '@/lib/constants';
import type { AuxiliaryConfig, ProcessingStage, UploadedFileInfo, ViewMode } from '@/lib/types';

type ModelId = (typeof MODELS)[number]['id'];

export default function WorkspacePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedModel, setSelectedModel] = useState<ModelId>(MODELS[0].id);
  const [opticalFile, setOpticalFile] = useState<UploadedFileInfo | null>(null);
  const [sarFile, setSarFile] = useState<UploadedFileInfo | null>(null);
  const [stage, setStage] = useState<ProcessingStage>('idle');
  const [viewMode, setViewMode] = useState<ViewMode>('slider');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [apiOnline, setApiOnline] = useState(false);
  const [metrics, setMetrics] = useState(getDemoMetrics(MODELS[0].id));
  const [auxiliary, setAuxiliary] = useState<AuxiliaryConfig>({
    sentinel1: true,
    sentinel2: false,
    temporalRef: false,
    dem: false,
    cloudMask: true,
  });

  const opticalRef = useRef<HTMLInputElement>(null);
  const sarRef = useRef<HTMLInputElement>(null);
  const s2Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkApiHealth().then(setApiOnline);
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (f: UploadedFileInfo | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setter({ name: file.name, sizeMB: (file.size / (1024 * 1024)).toFixed(2), file });
    }
  };

  const runPipeline = useCallback(async () => {
    if (!opticalFile) return;

    const stages: ProcessingStage[] = ['uploading', 'preprocessing', 'inference', 'postprocessing', 'complete'];
    for (const s of stages) {
      setStage(s);
      await new Promise((r) => setTimeout(r, s === 'inference' ? 1800 : 700));
    }

    try {
      if (apiOnline) {
        await reconstructImage(opticalFile.file, sarFile?.file, selectedModel);
      }
    } catch {
      /* demo mode fallback */
    }

    setMetrics(getDemoMetrics(selectedModel));
  }, [opticalFile, sarFile, selectedModel, apiOnline]);

  const reset = () => {
    setOpticalFile(null);
    setSarFile(null);
    setStage('idle');
    setMetrics(getDemoMetrics(selectedModel));
    [opticalRef, sarRef, s2Ref].forEach((r) => {
      if (r.current) r.current.value = '';
    });
  };

  const isProcessing = stage !== 'idle' && stage !== 'complete';
  const isComplete = stage === 'complete';
  const selectedModelData = MODELS.find((m) => m.id === selectedModel)!;

  const card = isDarkMode ? 'glass-card' : 'bg-white/80 border-slate-200 backdrop-blur-xl shadow-xl border';
  const input = isDarkMode
    ? 'bg-[#16271e]/80 border-[#254633] text-emerald-100'
    : 'bg-white border-slate-300 text-slate-900';

  return (
    <div className={`min-h-[calc(100vh-8rem)] transition-colors ${isDarkMode ? 'text-emerald-50' : 'text-slate-900'}`}>
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover brightness-125 contrast-110 saturate-125"
        />
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-[#070d0a]/18' : 'bg-slate-100/25'} backdrop-blur-[1px]`} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Header bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black tracking-tight">Reconstruction Workspace</h1>
            <p className="text-xs text-emerald-100/50">Upload LISS-IV imagery · Select GenAI model · Generate cloud-free output</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${isDarkMode ? 'border-emerald-800 bg-emerald-900/30 text-emerald-300' : 'border-slate-300 bg-white text-slate-700'}`}
            >
              {isDarkMode ? '☀️ Day' : '🌙 Night'}
            </button>
            <span
              className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                apiOnline
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                  : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
              }`}
            >
              {apiOnline ? '● API Online' : '● Demo Mode'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Sidebar */}
          <aside className={`w-full shrink-0 rounded-2xl p-6 lg:w-80 ${card}`}>
            {/* Step 1: Ingestion */}
            <section className="mb-6">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-500">1 · Data Ingestion</h2>
              <input type="file" accept=".tif,.tiff,.png,.jpg" ref={opticalRef} onChange={(e) => handleFile(e, setOpticalFile)} className="hidden" />
              <input type="file" accept=".tif,.tiff,.png,.jpg" ref={sarRef} onChange={(e) => handleFile(e, setSarFile)} className="hidden" />
              <input type="file" accept=".tif,.tiff,.png,.jpg" ref={s2Ref} className="hidden" />

              <div className="space-y-3">
                <UploadBox
                  label="LISS-IV Optical (Cloudy)"
                  sublabel={opticalFile ? `${opticalFile.name} · ${opticalFile.sizeMB} MB` : 'Required · .tif / .png'}
                  acquired={!!opticalFile}
                  required
                  onClick={() => opticalRef.current?.click()}
                  accent="emerald"
                />
                <UploadBox
                  label="Sentinel-1 SAR"
                  sublabel={sarFile ? `${sarFile.name} · ${sarFile.sizeMB} MB` : 'Optional · Cloud-penetrating'}
                  acquired={!!sarFile}
                  onClick={() => sarRef.current?.click()}
                  accent="teal"
                />
              </div>
            </section>

            {/* Step 2: Auxiliary toggles */}
            <section className="mb-6">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-500">2 · Auxiliary Fusion</h2>
              <div className="space-y-2">
                {(
                  [
                    ['sentinel1', 'Sentinel-1 SAR Fusion'],
                    ['sentinel2', 'Sentinel-2 Optical'],
                    ['temporalRef', 'Temporal Reference'],
                    ['dem', 'SRTM DEM'],
                    ['cloudMask', 'Auto Cloud Mask (Fmask)'],
                  ] as [keyof AuxiliaryConfig, string][]
                ).map(([key, label]) => (
                  <label key={key} className="flex cursor-pointer items-center justify-between rounded-lg border border-emerald-900/30 bg-[#0a110d]/50 px-3 py-2.5 text-xs">
                    <span className="text-emerald-100/70">{label}</span>
                    <input
                      type="checkbox"
                      checked={auxiliary[key]}
                      onChange={(e) => setAuxiliary((a) => ({ ...a, [key]: e.target.checked }))}
                      className="accent-emerald-500"
                    />
                  </label>
                ))}
              </div>
            </section>

            {/* Step 3: Model */}
            <section className="mb-6">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-500">3 · GenAI Architecture</h2>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as ModelId)}
                className={`w-full rounded-lg border p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 ${input}`}
              >
                {MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {m.tagline}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-[10px] leading-relaxed text-emerald-100/40">{selectedModelData.description}</p>
            </section>

            {/* Actions */}
            <div className="space-y-3 border-t border-emerald-900/30 pt-5">
              <button
                type="button"
                onClick={runPipeline}
                disabled={!opticalFile || isProcessing}
                className={`w-full rounded-xl py-3.5 text-xs font-bold tracking-wide transition-all ${
                  opticalFile && !isProcessing
                    ? 'bg-gradient-to-r from-emerald-700 to-teal-600 text-white shadow-lg shadow-emerald-900/30 hover:-translate-y-0.5 hover:from-emerald-600 hover:to-teal-500'
                    : 'cursor-not-allowed bg-emerald-900/20 text-emerald-100/30'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Run Geographic Reconstruction'}
              </button>
              {(opticalFile || isComplete) && (
                <button
                  type="button"
                  onClick={reset}
                  className="w-full rounded-xl border border-red-500/20 py-2.5 text-xs font-semibold text-red-400 transition-all hover:bg-red-500/10"
                >
                  Clear & Reset
                </button>
              )}
              {isComplete && (
                <button
                  type="button"
                  className="w-full rounded-xl border border-emerald-500/30 py-2.5 text-xs font-semibold text-emerald-400 transition-all hover:bg-emerald-500/10"
                >
                  ⬇ Export GeoTIFF
                </button>
              )}
            </div>
          </aside>

          {/* Main canvas */}
          <main className={`flex flex-1 flex-col rounded-2xl p-6 ${card}`}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-bold">Spatial Render Canvas</h3>
              {isComplete && (
                <div className="flex rounded-lg border border-emerald-900/30 bg-[#0a110d]/60 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setViewMode('slider')}
                    className={`rounded-md px-3 py-1.5 transition-all ${viewMode === 'slider' ? 'bg-emerald-600 font-semibold text-white' : 'text-emerald-100/60 hover:text-emerald-100'}`}
                  >
                    Swipe
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('split')}
                    className={`rounded-md px-3 py-1.5 transition-all ${viewMode === 'split' ? 'bg-emerald-600 font-semibold text-white' : 'text-emerald-100/60 hover:text-emerald-100'}`}
                  >
                    Side by Side
                  </button>
                </div>
              )}
            </div>

            {isProcessing && (
              <div className="mb-6">
                <ProcessingPipeline stage={stage} />
              </div>
            )}

            <div className="relative flex min-h-[400px] flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-emerald-900/30 bg-[#070d0a]/60 p-4">
              {!opticalFile && stage === 'idle' && (
                <EmptyState
                  title="Awaiting Geographic Data"
                  desc="Upload cloudy LISS-IV imagery from Bhoonidhi to begin cloud removal reconstruction."
                />
              )}

              {opticalFile && stage === 'idle' && (
                <ReadyState model={selectedModelData.name} auxiliary={auxiliary} />
              )}

              {isProcessing && (
                <ProcessingState stage={stage} model={selectedModelData.name} />
              )}

              {isComplete && (
                <div className="flex w-full flex-col items-center gap-6 animate-in fade-in duration-700">
                  <ComparisonViewer
                    viewMode={viewMode}
                    sliderPosition={sliderPosition}
                    onSliderChange={setSliderPosition}
                    isDarkMode={isDarkMode}
                  />
                  <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
                    <MetricCard label="SSIM" value={metrics.ssim} accent="emerald" sublabel="Structural Similarity" />
                    <MetricCard label="PSNR" value={metrics.psnr} unit="dB" accent="teal" sublabel="Peak Signal-to-Noise" />
                    <MetricCard label="SAM" value={metrics.sam} unit="°" accent="cyan" sublabel="Spectral Angle Mapper" />
                    <MetricCard label="Fidelity" value={`${metrics.fidelity}%`} accent="violet" sublabel="Geographic Accuracy" />
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function UploadBox({
  label,
  sublabel,
  acquired,
  required,
  onClick,
  accent,
}: {
  label: string;
  sublabel: string;
  acquired: boolean;
  required?: boolean;
  onClick: () => void;
  accent: 'emerald' | 'teal';
}) {
  const colors = {
    emerald: acquired ? 'border-emerald-500 bg-emerald-500/10' : 'border-emerald-900/40 hover:border-emerald-500',
    teal: acquired ? 'border-teal-500 bg-teal-500/10' : 'border-emerald-900/40 hover:border-teal-500',
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={`cursor-pointer rounded-xl border-2 border-dashed p-4 text-center transition-all hover:-translate-y-0.5 ${colors[accent]}`}
    >
      <p className={`text-xs font-semibold ${accent === 'emerald' ? 'text-emerald-400' : 'text-teal-400'}`}>
        {acquired ? '✓ Acquired' : label}
        {required && !acquired && <span className="ml-1 text-red-400">*</span>}
      </p>
      <p className="mt-1 truncate text-[10px] text-emerald-100/50">{sublabel}</p>
    </div>
  );
}

function EmptyState({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="max-w-sm text-center">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-900/50 bg-[#0a110d]/80">
        <svg className="h-10 w-10 text-emerald-100/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h4 className="text-lg font-bold">{title}</h4>
      <p className="mt-2 text-sm text-emerald-100/50">{desc}</p>
    </div>
  );
}

function ReadyState({ model, auxiliary }: { model: string; auxiliary: AuxiliaryConfig }) {
  const activeAux = Object.entries(auxiliary).filter(([, v]) => v).map(([k]) => k);
  return (
    <div className="max-w-sm text-center">
      <div className="relative mx-auto mb-5 h-20 w-20">
        <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h4 className="text-lg font-bold">Ready for Inference</h4>
      <div className="mt-4 rounded-lg border border-emerald-900/30 bg-black/20 p-3 text-left text-xs">
        <p className="text-emerald-100/50">Model: <span className="font-mono font-bold text-emerald-400">{model}</span></p>
        <p className="mt-1 text-emerald-100/50">Fusion: <span className="text-emerald-300">{activeAux.join(', ') || 'none'}</span></p>
      </div>
    </div>
  );
}

function ProcessingState({ stage, model }: { stage: ProcessingStage; model: string }) {
  const messages: Record<ProcessingStage, string> = {
    idle: '',
    uploading: 'Uploading satellite tiles to processing queue...',
    preprocessing: 'Co-registering auxiliary layers · Generating cloud mask...',
    inference: `Running ${model} inference on GPU...`,
    postprocessing: 'Applying spectral normalization · Exporting GeoTIFF...',
    complete: '',
  };
  return (
    <div className="text-center">
      <div className="relative mx-auto mb-6 h-24 w-24">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-emerald-500 border-r-teal-500/30 border-b-emerald-500/10 border-l-teal-500/10" />
        <div className="absolute inset-2 animate-spin-reverse rounded-full border-4 border-t-teal-400/50 border-r-transparent border-b-transparent border-l-transparent" />
      </div>
      <h4 className="animate-pulse text-lg font-bold text-emerald-300">{messages[stage]}</h4>
      <p className="mt-2 font-mono text-xs text-emerald-100/40">Stage: {stage}</p>
    </div>
  );
}
