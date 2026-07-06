'use client';

import type { ViewMode } from '@/lib/types';

const CLOUDY_IMG =
  'https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=1200&auto=format&fit=crop';
const CLEAR_IMG =
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop';

interface ComparisonViewerProps {
  viewMode: ViewMode;
  sliderPosition: number;
  onSliderChange: (value: number) => void;
  isDarkMode?: boolean;
}

export default function ComparisonViewer({
  viewMode,
  sliderPosition,
  onSliderChange,
  isDarkMode = true,
}: ComparisonViewerProps) {
  if (viewMode === 'split') {
    return (
      <div className="grid h-full w-full grid-cols-1 gap-4 p-2 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${CLOUDY_IMG}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-300/90 to-slate-500/80 backdrop-blur-[2px]" />
          <div className="relative flex h-full min-h-[240px] flex-col items-center justify-center p-6">
            <span className="mb-3 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-800">
              Input · Cloudy LISS-IV
            </span>
            <p className="max-w-xs text-center text-xs font-medium text-slate-800/80">
              Opaque cloud cover obstructing target geographic region in NER study area
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${CLEAR_IMG}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-[#0a140f]/70 mix-blend-multiply" />
          <div className="relative flex h-full min-h-[240px] flex-col items-center justify-center p-6">
            <span className="mb-3 rounded-full border border-emerald-400/40 bg-emerald-900/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
              Output · Reconstructed
            </span>
            <p className="max-w-xs text-center text-xs font-medium text-emerald-100/80">
              Cloud-free surface reconstruction with preserved spectral characteristics
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative mx-auto aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-2xl border shadow-2xl ${
        isDarkMode ? 'border-emerald-900/50 bg-[#101c15]' : 'border-slate-200 bg-white'
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${CLEAR_IMG}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/80 via-emerald-900/60 to-[#0a140f]/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-xl border border-emerald-500/30 bg-black/50 px-5 py-4 text-center backdrop-blur-md">
            <p className="text-xs font-bold tracking-widest text-emerald-400">RECONSTRUCTED LISS-IV</p>
            <p className="mt-1 max-w-xs text-[11px] text-emerald-100/70">
              GenAI cloud removal complete — analysis-ready output
            </p>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-y-0 left-0 overflow-hidden border-r-4 border-emerald-500 shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
        style={{ width: `${sliderPosition}%` }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${CLOUDY_IMG}')`, width: `${100 / (sliderPosition / 100 || 1)}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200/95 to-slate-400/90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-xl border border-white/50 bg-white/70 px-5 py-4 text-center backdrop-blur-xl">
            <p className="text-xs font-bold tracking-widest text-slate-800">INPUT · CLOUDY</p>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-1 -translate-x-1/2 bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      />

      <div className="absolute inset-x-0 bottom-6 z-20 mx-auto w-[85%]">
        <input
          type="range"
          min={0}
          max={100}
          value={sliderPosition}
          onChange={(e) => onSliderChange(Number(e.target.value))}
          className="w-full cursor-ew-resize accent-emerald-500 opacity-80 hover:opacity-100"
          aria-label="Before after comparison slider"
        />
        <div className="mt-1 flex justify-between text-[10px] font-medium text-emerald-100/60">
          <span>Cloudy Input</span>
          <span>Clear Output</span>
        </div>
      </div>
    </div>
  );
}
