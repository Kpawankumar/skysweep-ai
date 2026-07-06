'use client';

import { useState } from 'react';
import { MODELS } from '@/lib/constants';

type ModelId = (typeof MODELS)[number]['id'];

type SortKey = 'ssim' | 'psnr' | 'sam';

export default function ModelsPage() {
  const [selectedId, setSelectedId] = useState<ModelId>(MODELS[0].id);
  const [sortBy, setSortBy] = useState<SortKey>('ssim');

  const sorted = [...MODELS].sort((a, b) => {
    if (sortBy === 'sam') return a.sam - b.sam;
    return b[sortBy] - a[sortBy];
  });

  const selected = MODELS.find((m) => m.id === selectedId)!;
  const maxSsim = Math.max(...MODELS.map((m) => m.ssim));

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div className="hero-gradient pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500">Architecture Benchmark</p>
          <h1 className="text-3xl font-black text-emerald-50">Generative AI Model Comparison</h1>
          <p className="mt-2 max-w-2xl text-sm text-emerald-100/50">
            Comparative assessment of diffusion models, GANs, transformers, and CNN baselines for
            LISS-IV cloud reconstruction — supporting transfer learning and fine-tuning workflows.
          </p>
        </div>

        {/* Sort controls */}
        <div className="mb-6 flex flex-wrap gap-2">
          {(['ssim', 'psnr', 'sam'] as SortKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSortBy(key)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                sortBy === key
                  ? 'bg-emerald-600 text-white'
                  : 'border border-emerald-800/40 text-emerald-100/60 hover:border-emerald-500/40'
              }`}
            >
              Sort by {key.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Model cards */}
          <div className="space-y-3 lg:col-span-1">
            {sorted.map((model, rank) => (
              <button
                key={model.id}
                type="button"
                onClick={() => setSelectedId(model.id)}
                className={`w-full rounded-xl border p-4 text-left transition-all ${
                  selectedId === model.id
                    ? 'border-emerald-500/50 bg-emerald-900/20'
                    : 'glass-card hover:border-emerald-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-xs font-bold text-emerald-500/60">#{rank + 1}</span>
                  <div
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: model.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-bold text-emerald-100">{model.name}</p>
                    <p className="text-[10px] text-emerald-100/40">{model.type} · {model.tagline}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400">{model.ssim}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="glass-card rounded-2xl p-8 lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase"
                    style={{ backgroundColor: `${selected.color}20`, color: selected.color }}
                  >
                    {selected.type}
                  </span>
                  <span className="text-[10px] text-emerald-100/40">{selected.params} parameters</span>
                </div>
                <h2 className="text-2xl font-black text-emerald-50">{selected.name}</h2>
                <p className="mt-1 text-sm text-emerald-400">{selected.tagline}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black" style={{ color: selected.color }}>
                  {selected.ssim}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-emerald-100/40">SSIM Score</p>
              </div>
            </div>

            <p className="mb-8 text-sm leading-relaxed text-emerald-100/60">{selected.description}</p>

            {/* Bar chart comparison */}
            <div className="mb-8">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-500">Performance Metrics</p>
              <div className="space-y-4">
                {[
                  { label: 'SSIM ↑', value: selected.ssim, max: 1, unit: '', color: selected.color },
                  { label: 'PSNR ↑', value: selected.psnr, max: 35, unit: ' dB', color: '#14b8a6' },
                  { label: 'SAM ↓', value: selected.sam, max: 10, unit: '°', color: '#06b6d4', invert: true },
                ].map((metric) => {
                  const pct = metric.invert
                    ? ((metric.max - metric.value) / metric.max) * 100
                    : (metric.value / metric.max) * 100;
                  return (
                    <div key={metric.label}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-emerald-100/60">{metric.label}</span>
                        <span className="font-mono font-bold text-emerald-300">
                          {metric.value}{metric.unit}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-emerald-900/40">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, backgroundColor: metric.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All models SSIM chart */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-500">All Models — SSIM Comparison</p>
              <div className="space-y-2">
                {MODELS.map((m) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <span className="w-28 truncate text-[10px] font-semibold text-emerald-100/60">{m.name}</span>
                    <div className="flex-1 h-4 overflow-hidden rounded bg-emerald-900/30">
                      <div
                        className="flex h-full items-center justify-end rounded pr-2 transition-all duration-700"
                        style={{
                          width: `${(m.ssim / maxSsim) * 100}%`,
                          backgroundColor: m.color,
                        }}
                      >
                        <span className="text-[9px] font-bold text-white/90">{m.ssim}</span>
                      </div>
                    </div>
                    <span className="w-16 text-[10px] text-emerald-100/40">{m.speed}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {['Transfer Learning Ready', 'Multi-Modal Input', 'Fine-Tuning Supported', 'GPU Inference'].map((tag) => (
                <span key={tag} className="rounded-full border border-emerald-700/30 bg-emerald-900/20 px-3 py-1 text-[10px] font-semibold text-emerald-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
