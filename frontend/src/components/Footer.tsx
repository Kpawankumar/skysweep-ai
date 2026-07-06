import Link from 'next/link';
import { HACKATHON, TEAM_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-emerald-900/30 bg-[#050806]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-black text-white">
                SS
              </div>
              <div>
                <p className="font-bold text-emerald-50">SkySweep AI</p>
                <p className="text-xs text-emerald-500/80">Generative Cloud Removal Framework</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-emerald-100/50">
              A Generative AI framework for automated cloud removal and surface reconstruction in LISS-IV
              satellite imagery — preserving spatial structures and spectral characteristics for the North
              Eastern Region of India.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-500">Platform</h4>
            <ul className="space-y-2 text-sm text-emerald-100/60">
              <li><Link href="/workspace" className="hover:text-emerald-300">Reconstruction Workspace</Link></li>
              <li><Link href="/preprocessing" className="hover:text-emerald-300">Data Preprocessing</Link></li>
              <li><Link href="/models" className="hover:text-emerald-300">Model Comparison</Link></li>
              <li><Link href="/evaluation" className="hover:text-emerald-300">Quality Assessment</Link></li>
              <li><Link href="/workflow" className="hover:text-emerald-300">Operational Workflow</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-500">Hackathon</h4>
            <ul className="space-y-2 text-sm text-emerald-100/60">
              <li>{HACKATHON.name}</li>
              <li>{HACKATHON.problem}</li>
              <li className="text-emerald-400/80">LISS-IV · NER India</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-emerald-900/20 pt-8 sm:flex-row">
          <p className="text-xs text-emerald-100/40">
            © 2026 SkySweep AI · {HACKATHON.name}
          </p>
          <p className="rounded-full border border-emerald-500/20 bg-emerald-900/20 px-4 py-2 text-xs font-semibold text-emerald-400">
            Built by team {TEAM_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
