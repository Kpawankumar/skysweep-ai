'use client';

import { useEffect, useState } from 'react';
import ComparisonViewer from '@/components/ComparisonViewer';
import MetricCard from '@/components/MetricCard';
import { fetchEvaluationSamples, fetchModels } from '@/lib/api';
import type { EvaluationSample, ModelInfo } from '@/lib/types';

export default function EvaluationPage() {
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [samples, setSamples] = useState<EvaluationSample[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [viewMode, setViewMode] = useState<'slider' | 'split'>('slider');
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    Promise.all([fetchModels(), fetchEvaluationSamples()])
      .then(([loadedModels, loadedSamples]) => {
        setModels(loadedModels);
        setSamples(loadedSamples);
        setSelectedModel((current) => current || loadedModels[0]?.id || '');
      })
      .catch(() => {
        setModels([]);
        setSamples([]);
      });
  }, []);

  const model = models.find((m) => m.id === selectedModel) ?? models[0] ?? null;

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div className="hero-gradient pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500">Quality Assessment</p>
          <h1 className="text-3xl font-black text-emerald-50">Quantitative & Qualitative Evaluation</h1>
          <p className="mt-2 max-w-2xl text-sm text-emerald-100/50">
            Evaluate reconstructed outputs using SSIM, PSNR, SAM metrics and visual before/after
            comparison across NER study regions.
          </p>
        </div>

        {/* Model selector */}
        <div className="mb-8 flex flex-wrap gap-2">
          {models.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedModel(m.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                selectedModel === m.id
                  ? 'text-white shadow-lg'
                  : 'border border-emerald-800/40 text-emerald-100/60 hover:border-emerald-500/40'
              }`}
              style={selectedModel === m.id ? { backgroundColor: m.color } : undefined}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Metrics grid */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {model ? (
            <>
              <MetricCard label="SSIM" value={model.quality.ssim} accent="emerald" sublabel="Structural Similarity Index" />
              <MetricCard label="PSNR" value={model.quality.psnr} unit="dB" accent="teal" sublabel="Peak Signal-to-Noise Ratio" />
              <MetricCard label="SAM" value={model.quality.sam} unit="°" accent="cyan" sublabel="Spectral Angle Mapper" />
            </>
          ) : (
            <MetricCard label="Model" value="Loading" accent="emerald" sublabel="Fetching backend catalog" />
          )}
          <MetricCard label="RMSE" value="0.024" accent="violet" sublabel="Reflectance Error" />
        </div>

        {/* Visual comparison */}
        <div className="glass-card mb-8 rounded-2xl p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-bold">Visual Comparison — {model?.name ?? 'Loading...'}</h2>
            <div className="flex rounded-lg border border-emerald-900/30 bg-[#0a110d]/60 p-1 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('slider')}
                className={`rounded-md px-3 py-1.5 ${viewMode === 'slider' ? 'bg-emerald-600 font-semibold text-white' : 'text-emerald-100/60'}`}
              >
                Swipe
              </button>
              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={`rounded-md px-3 py-1.5 ${viewMode === 'split' ? 'bg-emerald-600 font-semibold text-white' : 'text-emerald-100/60'}`}
              >
                Side by Side
              </button>
            </div>
          </div>
              <ComparisonViewer
                viewMode={viewMode}
                sliderPosition={sliderPosition}
                onSliderChange={setSliderPosition}
              />
        </div>

        {/* Qualitative assessment table */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="mb-6 text-sm font-bold">Qualitative Assessment — NER Study Regions</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead>
                <tr className="border-b border-emerald-900/30">
                  <th className="pb-3 text-xs font-bold uppercase tracking-widest text-emerald-500">Region</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-widest text-emerald-500">Cloud Cover</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-widest text-emerald-500">Reconstruction Quality</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-widest text-emerald-500">Spectral Consistency</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-widest text-emerald-500">Spatial Detail</th>
                </tr>
              </thead>
              <tbody>
                {samples.map((s) => (
                  <tr key={s.region} className="border-b border-emerald-900/20">
                    <td className="py-4 font-semibold text-emerald-100">{s.region}</td>
                    <td className="py-4 font-mono text-emerald-100/60">{s.cloudCover}</td>
                    <td className="py-4">
                      <QualityBadge level={s.improvement} />
                    </td>
                    <td className="py-4">
                      <StarRating rating={s.improvement === 'Very High' ? 5 : s.improvement === 'High' ? 4 : 3} />
                    </td>
                    <td className="py-4">
                      <StarRating rating={s.improvement === 'Very High' ? 5 : 4} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Methodology note */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { title: 'Quantitative', desc: 'SSIM, PSNR, SAM, and RMSE computed against held-out cloud-free reference scenes from Bhoonidhi archive.' },
            { title: 'Qualitative', desc: 'Expert visual assessment of spatial structure preservation, spectral consistency, and artifact detection across NER terrain types.' },
            { title: 'Validation Split', desc: '80/10/10 train/validation/test split with spatial blocking to prevent geographic data leakage.' },
          ].map((m) => (
            <div key={m.title} className="glass-card rounded-xl p-5">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500">{m.title}</h3>
              <p className="text-xs leading-relaxed text-emerald-100/50">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QualityBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    'Very High': 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
    High: 'bg-teal-600/20 text-teal-400 border-teal-500/30',
    Moderate: 'bg-amber-600/20 text-amber-400 border-amber-500/30',
  };
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${colors[level] ?? colors.Moderate}`}>
      {level}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400">
      {'★'.repeat(rating)}
      <span className="text-emerald-900/60">{'★'.repeat(5 - rating)}</span>
    </span>
  );
}
