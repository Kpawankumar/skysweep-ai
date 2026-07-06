'use client';

import type { ProcessingStage } from '@/lib/types';

const STAGES: { id: ProcessingStage; label: string }[] = [
  { id: 'uploading', label: 'Upload' },
  { id: 'preprocessing', label: 'Preprocess' },
  { id: 'inference', label: 'Inference' },
  { id: 'postprocessing', label: 'Post-process' },
  { id: 'complete', label: 'Complete' },
];

interface ProcessingPipelineProps {
  stage: ProcessingStage;
}

export default function ProcessingPipeline({ stage }: ProcessingPipelineProps) {
  const stageOrder: ProcessingStage[] = ['uploading', 'preprocessing', 'inference', 'postprocessing', 'complete'];
  const currentIdx = stageOrder.indexOf(stage);

  return (
    <div className="flex items-center justify-between gap-1">
      {STAGES.map((s, i) => {
        const done = currentIdx > i;
        const active = s.id === stage;
        return (
          <div key={s.id} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full items-center">
              {i > 0 && (
                <div
                  className={`h-0.5 flex-1 transition-colors duration-500 ${
                    done || active ? 'bg-emerald-500' : 'bg-emerald-900/40'
                  }`}
                />
              )}
              <div
                className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-all duration-500 ${
                  done
                    ? 'border-emerald-500 bg-emerald-600 text-white'
                    : active
                      ? 'animate-pulse border-emerald-400 bg-emerald-500/20 text-emerald-300 ring-4 ring-emerald-500/20'
                      : 'border-emerald-900/50 bg-[#0a110d] text-emerald-100/30'
                }`}
              >
                {done ? '✓' : i + 1}
              </div>
              {i < STAGES.length - 1 && (
                <div
                  className={`h-0.5 flex-1 transition-colors duration-500 ${
                    done ? 'bg-emerald-500' : 'bg-emerald-900/40'
                  }`}
                />
              )}
            </div>
            <span
              className={`text-[9px] font-semibold uppercase tracking-wider ${
                active ? 'text-emerald-400' : done ? 'text-emerald-500/70' : 'text-emerald-100/30'
              }`}
            >
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
