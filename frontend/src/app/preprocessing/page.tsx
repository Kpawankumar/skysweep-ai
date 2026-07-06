'use client';

import { useState } from 'react';
import { DATASETS, PREPROCESSING_STEPS } from '@/lib/constants';

export default function PreprocessingPage() {
  const [activeStep, setActiveStep] = useState(3);

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div className="hero-gradient pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500">Data Pipeline</p>
          <h1 className="text-3xl font-black text-emerald-50">Preprocessing & Co-Registration</h1>
          <p className="mt-2 max-w-2xl text-sm text-emerald-100/50">
            Collection and preprocessing of cloudy and cloud-free LISS-IV imagery with cloud mask generation
            and auxiliary dataset co-registration for multi-modal GenAI training.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Pipeline steps */}
          <div className="space-y-3 lg:col-span-1">
            {PREPROCESSING_STEPS.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                className={`w-full rounded-xl border p-4 text-left transition-all ${
                  activeStep === step.id
                    ? 'border-emerald-500/50 bg-emerald-900/20 shadow-lg shadow-emerald-900/20'
                    : 'glass-card hover:border-emerald-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      step.status === 'complete'
                        ? 'bg-emerald-600 text-white'
                        : step.status === 'active'
                          ? 'animate-pulse-glow bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/40'
                          : 'bg-emerald-900/30 text-emerald-100/30'
                    }`}
                  >
                    {step.status === 'complete' ? '✓' : step.id}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-100">{step.title}</p>
                    <p className="text-[10px] capitalize text-emerald-100/40">{step.status}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Step detail */}
          <div className="glass-card rounded-2xl p-8 lg:col-span-2">
            {PREPROCESSING_STEPS.filter((s) => s.id === activeStep).map((step) => (
              <div key={step.id}>
                <div className="mb-6 flex items-center gap-3">
                  <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-xs font-bold text-emerald-400">
                    Step {step.id} of {PREPROCESSING_STEPS.length}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                      step.status === 'complete'
                        ? 'bg-emerald-600/20 text-emerald-400'
                        : step.status === 'active'
                          ? 'bg-amber-600/20 text-amber-400'
                          : 'bg-slate-600/20 text-slate-400'
                    }`}
                  >
                    {step.status}
                  </span>
                </div>
                <h2 className="mb-4 text-2xl font-black text-emerald-50">{step.title}</h2>
                <p className="mb-8 text-sm leading-relaxed text-emerald-100/60">{step.description}</p>

                <div className="mb-8">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-500">Tools Used</p>
                  <div className="flex flex-wrap gap-2">
                    {step.tools.map((t) => (
                      <span key={t} className="rounded-lg border border-emerald-800/40 bg-emerald-900/20 px-3 py-1.5 font-mono text-xs text-emerald-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual pipeline diagram for active step */}
                <div className="scan-effect relative overflow-hidden rounded-xl border border-emerald-900/30 bg-[#070d0a]/80 p-6">
                  <PipelineVisual stepId={step.id} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dataset table */}
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-black text-emerald-50">Integrated Datasets</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DATASETS.map((d) => (
              <div key={d.name} className="glass-card rounded-xl p-5 transition-all hover:border-emerald-500/30">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-bold text-emerald-100">{d.name}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${d.role === 'Primary' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-teal-600/20 text-teal-400'}`}>
                    {d.role}
                  </span>
                </div>
                <dl className="space-y-1 text-xs text-emerald-100/50">
                  <div className="flex justify-between"><dt>Source</dt><dd className="text-emerald-100/70">{d.source}</dd></div>
                  <div className="flex justify-between"><dt>Resolution</dt><dd className="font-mono text-emerald-100/70">{d.resolution}</dd></div>
                  <div className="flex justify-between"><dt>Bands</dt><dd className="text-emerald-100/70">{d.bands}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function PipelineVisual({ stepId }: { stepId: number }) {
  const visuals: Record<number, React.ReactNode> = {
    1: (
      <div className="flex items-center justify-center gap-6 py-4">
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-900/30 text-2xl">🛰️</div>
          <p className="text-xs text-emerald-400">Bhoonidhi Portal</p>
        </div>
        <div className="text-emerald-500">→</div>
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-900/30 text-2xl">📁</div>
          <p className="text-xs text-emerald-400">LISS-IV Scenes</p>
        </div>
        <div className="text-emerald-500">→</div>
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-900/30 text-2xl">☁️</div>
          <p className="text-xs text-emerald-400">Cloudy + Clear</p>
        </div>
      </div>
    ),
    2: (
      <div className="space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-emerald-400"><span className="text-emerald-600">$</span> gdal_translate -of GTiff input.tif corrected.tif</div>
        <div className="flex items-center gap-2 text-emerald-100/50"><span className="text-emerald-600">$</span> python radiometric_correction.py --sensor LISS4</div>
        <div className="rounded-lg bg-emerald-900/20 p-3 text-emerald-300">✓ TOA reflectance conversion complete · 4 VNIR bands normalized</div>
      </div>
    ),
    3: (
      <div className="grid grid-cols-3 gap-4">
        {['Cloud', 'Cloud Shadow', 'Clear'].map((label, i) => (
          <div key={label} className="rounded-lg border border-emerald-900/30 p-3 text-center">
            <div className={`mx-auto mb-2 h-12 w-full rounded ${i === 0 ? 'bg-white/80' : i === 1 ? 'bg-slate-700/80' : 'bg-emerald-800/60'}`} />
            <p className="text-[10px] font-semibold text-emerald-400">{label}</p>
          </div>
        ))}
      </div>
    ),
    4: (
      <div className="flex flex-wrap items-center justify-center gap-3 py-2">
        {['LISS-IV', 'S1 SAR', 'S2 MSI', 'DEM', 'Temporal'].map((src, i) => (
          <div key={src} className="flex items-center gap-2">
            <span className="rounded-lg border border-emerald-700/40 bg-emerald-900/30 px-3 py-2 text-[10px] font-bold text-emerald-300">{src}</span>
            {i < 4 && <span className="text-emerald-600">⊕</span>}
          </div>
        ))}
        <p className="mt-3 w-full text-center text-[10px] text-emerald-100/40">RMSE target: &lt; 0.5 pixel @ 5.8m resolution</p>
      </div>
    ),
    5: (
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded border border-emerald-800/30 bg-gradient-to-br from-emerald-900/40 to-teal-900/20" />
        ))}
        <p className="col-span-4 mt-2 text-center text-[10px] text-emerald-100/40">256×256 patches · 50% overlap · Albumentations augmentation</p>
      </div>
    ),
    6: (
      <div className="space-y-2 text-xs">
        {[
          { check: 'Co-registration RMSE', val: '0.32 px', ok: true },
          { check: 'Cloud mask coverage', val: '23.4%', ok: true },
          { check: 'Spectral histogram alignment', val: 'KL div 0.08', ok: true },
          { check: 'No-data pixel ratio', val: '1.2%', ok: true },
        ].map((q) => (
          <div key={q.check} className="flex items-center justify-between rounded-lg bg-emerald-900/10 px-4 py-2">
            <span className="text-emerald-100/60">{q.check}</span>
            <span className={`font-mono font-bold ${q.ok ? 'text-emerald-400' : 'text-red-400'}`}>
              {q.ok ? '✓' : '✗'} {q.val}
            </span>
          </div>
        ))}
      </div>
    ),
  };

  return visuals[stepId] ?? null;
}
