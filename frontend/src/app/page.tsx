import Link from 'next/link';
import { HACKATHON, MODELS, DATASETS } from '@/lib/constants';

const OUTCOMES = [
  'Automated cloud-free reconstruction of LISS-IV imagery',
  'Improved usability under persistent cloud-cover conditions',
  'Enhanced spatial and spectral consistency in outputs',
  'Analysis-ready satellite products for geospatial applications',
  'Prototype framework for operational deployment',
  'Comparative assessment of Generative AI architectures',
];

const FEATURES = [
  {
    icon: '🛰️',
    title: 'Multi-Modal Fusion',
    desc: 'Fuses LISS-IV optical with Sentinel-1 SAR, Sentinel-2, temporal references, and DEM for robust reconstruction.',
  },
  {
    icon: '🧠',
    title: '6 GenAI Architectures',
    desc: 'Diffusion models, GANs, Swin-Transformers, and attention U-Nets — benchmarked for cloud removal quality.',
  },
  {
    icon: '📊',
    title: 'Quantitative Evaluation',
    desc: 'SSIM, PSNR, SAM, and geographic fidelity metrics with interactive before/after visualization.',
  },
  {
    icon: '⚙️',
    title: 'Operational Pipeline',
    desc: 'End-to-end workflow from Bhoonidhi ingestion to analysis-ready GeoTIFF export and API deployment.',
  },
  {
    icon: '🏔️',
    title: 'NER-Optimized',
    desc: 'Tuned for tropical and mountainous terrain of North Eastern India — forests, rivers, and ridges.',
  },
  {
    icon: '☁️',
    title: 'Cloud Mask Intelligence',
    desc: 'Automated Fmask cloud/shadow detection with co-registration of auxiliary datasets.',
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-30 mix-blend-screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2000&auto=format&fit=crop"
            alt="Earth from Space"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070d0a] via-transparent to-[#070d0a]" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-900/20 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-400 uppercase">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {HACKATHON.name} · {HACKATHON.problem}
          </div>

          <h1 className="mb-6 text-5xl font-black tracking-tighter sm:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-br from-white via-emerald-100 to-emerald-700 bg-clip-text text-transparent">
              SKYSWEEP
            </span>
            <span className="text-emerald-500"> AI</span>
          </h1>

          <p className="mx-auto mb-4 max-w-3xl text-lg font-light text-emerald-100/70 sm:text-xl">
            Generative AI-Based Cloud Removal and Reconstruction for{' '}
            <span className="font-semibold text-emerald-400">LISS-IV Satellite Imagery</span>
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-sm text-emerald-100/50">
            Revealing ground truth beneath persistent cloud cover over the {HACKATHON.region} using
            spatial, spectral, and temporal deep learning fusion.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/workspace"
              className="group flex items-center gap-3 rounded-full bg-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-1 hover:bg-emerald-500 hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.7)]"
            >
              Launch Reconstruction Engine
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/models"
              className="rounded-full border border-emerald-500/30 bg-white/5 px-8 py-4 text-sm font-semibold text-emerald-100/80 backdrop-blur-md transition-all hover:bg-white/10"
            >
              Explore AI Models
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { val: '6', label: 'GenAI Models' },
              { val: '5.8m', label: 'LISS-IV Resolution' },
              { val: '0.951', label: 'Best SSIM Score' },
              { val: '4+', label: 'Data Sources' },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-4">
                <p className="text-2xl font-black text-emerald-400">{s.val}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-100/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-emerald-900/30 bg-gradient-to-b from-[#0a110d] to-[#050806] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500">Problem Statement</p>
            <h2 className="text-3xl font-black text-emerald-50 sm:text-4xl">The Cloud Cover Challenge</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="mb-4 text-lg font-bold text-emerald-300">Challenge</h3>
              <p className="text-sm leading-relaxed text-emerald-100/60">
                Persistent cloud cover over tropical and mountainous regions like the North Eastern Region
                of India severely limits optical satellite imagery usability. Clouds and cloud shadows reduce
                data availability for land use mapping, disaster monitoring, environmental assessment, and
                infrastructure analysis. Traditional cloud masking leads to information loss and incomplete
                scene interpretation.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Cloud Masking Loss', 'Temporal Gaps', 'Spectral Distortion', 'NER Terrain Complexity'].map((tag) => (
                  <span key={tag} className="rounded-full border border-red-500/20 bg-red-900/20 px-3 py-1 text-[10px] font-semibold text-red-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h3 className="mb-4 text-lg font-bold text-emerald-300">Our Solution</h3>
              <p className="text-sm leading-relaxed text-emerald-100/60">
                SkySweep AI leverages Generative AI — diffusion models, GANs, and transformer architectures —
                to reconstruct cloud-covered regions while preserving fine-scale spatial details and spectral
                consistency. Multi-modal fusion with SAR, optical auxiliary data, and temporal references
                enables analysis-ready cloud-free LISS-IV products.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['GenAI Reconstruction', 'Multi-Sensor Fusion', 'Spectral Preservation', 'Operational Scale'].map((tag) => (
                  <span key={tag} className="rounded-full border border-emerald-500/20 bg-emerald-900/20 px-3 py-1 text-[10px] font-semibold text-emerald-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500">Platform Capabilities</p>
            <h2 className="text-3xl font-black text-emerald-50">Complete Cloud Removal Framework</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="glass-card group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-emerald-500/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-900/30 text-2xl transition-transform group-hover:scale-110">
                  {f.icon}
                </div>
                <h3 className="mb-2 font-bold text-emerald-50">{f.title}</h3>
                <p className="text-sm leading-relaxed text-emerald-100/50">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Datasets */}
      <section className="border-t border-emerald-900/30 bg-[#0a110d] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500">Data Sources</p>
            <h2 className="text-3xl font-black text-emerald-50">Multi-Modal Dataset Integration</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-emerald-900/30">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-emerald-900/30 bg-emerald-900/10">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-emerald-500">Dataset</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-emerald-500">Source</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-emerald-500">Role</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-emerald-500">Resolution</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-emerald-500">Bands</th>
                </tr>
              </thead>
              <tbody>
                {DATASETS.map((d, i) => (
                  <tr key={d.name} className={`border-b border-emerald-900/20 ${i % 2 === 0 ? 'bg-[#0a110d]' : 'bg-[#0d1610]'}`}>
                    <td className="px-6 py-4 font-semibold text-emerald-100">{d.name}</td>
                    <td className="px-6 py-4 text-emerald-100/60">{d.source}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${d.role === 'Primary' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-teal-600/20 text-teal-400'}`}>
                        {d.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-emerald-100/60">{d.resolution}</td>
                    <td className="px-6 py-4 text-emerald-100/60">{d.bands}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Expected Outcomes */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500">Expected Outcomes</p>
              <h2 className="mb-8 text-3xl font-black text-emerald-50">Hackathon Deliverables</h2>
              <ul className="space-y-4">
                {OUTCOMES.map((o, i) => (
                  <li key={o} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600/20 text-xs font-bold text-emerald-400">
                      {i + 1}
                    </span>
                    <span className="text-sm text-emerald-100/70">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-500">Top Performing Models</p>
              <div className="space-y-4">
                {[...MODELS]
                  .sort((a, b) => b.ssim - a.ssim)
                  .slice(0, 4)
                  .map((m, i) => (
                    <div key={m.id} className="flex items-center gap-4">
                      <span className="w-4 text-xs font-bold text-emerald-500/60">#{i + 1}</span>
                      <div className="flex-1">
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="font-semibold text-emerald-100">{m.name}</span>
                          <span className="font-mono text-emerald-400">SSIM {m.ssim}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-emerald-900/40">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${m.ssim * 100}%`, backgroundColor: m.color }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <Link href="/models" className="mt-6 inline-block text-xs font-semibold text-emerald-400 hover:text-emerald-300">
                View full model comparison →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-emerald-900/30 bg-gradient-to-r from-emerald-950/50 to-teal-950/50 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-black text-emerald-50">Ready to Reconstruct?</h2>
          <p className="mb-8 text-emerald-100/60">
            Upload cloudy LISS-IV imagery, select a GenAI architecture, and generate analysis-ready cloud-free products.
          </p>
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/30 transition-all hover:bg-emerald-500"
          >
            Open Workspace
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
