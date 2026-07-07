'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchWorkflowPhases } from '@/lib/api';
import type { WorkflowPhase } from '@/lib/types';

const TECH_STACK = [
  { category: 'Deep Learning', items: ['PyTorch', 'TensorFlow', 'torchvision'] },
  { category: 'Geospatial', items: ['GDAL', 'Rasterio', 'QGIS'] },
  { category: 'Processing', items: ['OpenCV', 'NumPy', 'Scikit-image', 'Albumentations'] },
  { category: 'Deployment', items: ['FastAPI', 'Next.js', 'Vercel', 'Docker'] },
];

export default function WorkflowPage() {
  const [workflow, setWorkflow] = useState<WorkflowPhase[]>([]);

  useEffect(() => {
    fetchWorkflowPhases().then(setWorkflow).catch(() => setWorkflow([]));
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div className="hero-gradient pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500">Operational Deployment</p>
          <h1 className="text-3xl font-black text-emerald-50">Scalable Cloud Removal Workflow</h1>
          <p className="mt-2 max-w-2xl text-sm text-emerald-100/50">
            End-to-end pipeline from data ingestion through GenAI inference to analysis-ready product
            generation — designed for operational deployment in persistent cloud-cover regions.
          </p>
        </div>

        {/* Workflow phases */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map((phase, i) => (
            <div key={phase.phase} className="glass-card relative rounded-2xl p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600/20 text-sm font-black text-emerald-400">
                {i + 1}
              </div>
              <h3 className="mb-4 text-lg font-bold text-emerald-100">{phase.phase}</h3>
              <ol className="space-y-2">
                {phase.steps.map((step, j) => (
                  <li key={step} className="flex items-start gap-2 text-xs text-emerald-100/60">
                    <span className="mt-0.5 font-mono text-[10px] text-emerald-500">{j + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
              {i < workflow.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-emerald-600 lg:block">→</div>
              )}
            </div>
          ))}
        </div>

        {/* Architecture diagram */}
        <div className="glass-card mb-16 rounded-2xl p-8">
          <h2 className="mb-8 text-center text-lg font-black text-emerald-50">System Architecture</h2>
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-center">
            {[
              { label: 'Data Sources', items: ['Bhoonidhi LISS-IV', 'Sentinel-1/2', 'DEM'], color: '#10b981' },
              { label: 'Preprocessing', items: ['GDAL Pipeline', 'Cloud Mask', 'Co-register'], color: '#14b8a6' },
              { label: 'GenAI Engine', items: ['6 Architectures', 'GPU Inference', 'Multi-Modal'], color: '#06b6d4' },
              { label: 'API Layer', items: ['FastAPI', 'REST Endpoints', 'CORS'], color: '#8b5cf6' },
              { label: 'Frontend', items: ['Next.js Dashboard', 'Visualization', 'Export'], color: '#ec4899' },
            ].map((block, i) => (
              <div key={block.label} className="flex items-center gap-4">
                <div
                  className="w-36 rounded-xl border p-4 text-center"
                  style={{ borderColor: `${block.color}40`, backgroundColor: `${block.color}10` }}
                >
                  <p className="mb-2 text-xs font-bold" style={{ color: block.color }}>{block.label}</p>
                  {block.items.map((item) => (
                    <p key={item} className="text-[10px] text-emerald-100/50">{item}</p>
                  ))}
                </div>
                {i < 4 && <span className="hidden text-emerald-600 lg:inline">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Solution steps from problem statement */}
        <div className="mb-16">
          <h2 className="mb-6 text-xl font-black text-emerald-50">Solution Implementation Steps</h2>
          <div className="space-y-3">
            {[
              'Collection and preprocessing of cloudy and cloud-free LISS-IV imagery',
              'Preparation of cloud masks and co-registration of auxiliary datasets',
              'Identification and reuse of pre-trained deep learning models for transfer learning',
              'Fine-tuning of pre-trained models on LISS-IV imagery for cloud reconstruction',
              'Integration of temporal and multi-sensor information for improved quality',
              'Training, optimization, and validation of the developed deep learning model',
              'Generation of analysis-ready and cloud-free products',
              'Documentation and deployment of the developed workflow',
            ].map((step, i) => (
              <div key={step} className="glass-card flex items-center gap-4 rounded-xl p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600/20 text-xs font-bold text-emerald-400">
                  {i + 1}
                </span>
                <span className="text-sm text-emerald-100/70">{step}</span>
                <span className="ml-auto shrink-0 rounded-full bg-emerald-600/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                  {i < 5 ? 'Implemented' : i < 7 ? 'In Progress' : 'Planned'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_STACK.map((group) => (
            <div key={group.category} className="glass-card rounded-xl p-5">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-500">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-lg border border-emerald-800/30 bg-emerald-900/20 px-2.5 py-1 font-mono text-[10px] text-emerald-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="mb-2 text-xl font-black text-emerald-50">Start Processing Satellite Imagery</h2>
          <p className="mb-6 text-sm text-emerald-100/50">
            Launch the reconstruction workspace to upload LISS-IV data and generate cloud-free products.
          </p>
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-500"
          >
            Open Workspace
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
