# SkySweep AI — Frontend

Interactive dashboard for **Generative AI-Based Cloud Removal and Reconstruction for LISS-IV Satellite Imagery**.

Built for **Bhartiya Antriksh Hackathon 2026** (Problem Statement 2) by **Team Neural Ninjas United**.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — problem statement, datasets, expected outcomes, model highlights |
| `/workspace` | Main reconstruction engine — upload LISS-IV/SAR, select GenAI model, run pipeline, compare results |
| `/preprocessing` | Interactive data pipeline — ingestion, cloud masks, co-registration, patch extraction |
| `/models` | Comparative benchmark of 6 GenAI architectures (Diffusion, GANs, Transformers, CNN) |
| `/evaluation` | Quantitative (SSIM, PSNR, SAM) and qualitative assessment across NER study regions |
| `/workflow` | Operational deployment workflow, system architecture, tech stack |

## Features

- **Multi-page navigation** with sticky navbar and footer
- **Reconstruction workspace** with drag-and-drop file upload, auxiliary fusion toggles, and processing pipeline visualization
- **Before/after comparison** — swipe slider and side-by-side views
- **6 GenAI model selection** — Swin-Transformer, Hybrid cGAN, Pix2Pix, CycleGAN, U-Net+Attention, Diffusion
- **Auxiliary data fusion** — Sentinel-1 SAR, Sentinel-2, temporal reference, DEM, Fmask cloud mask
- **Demo mode** — works standalone without backend; connects to FastAPI when available
- **Dark/light theme** toggle in workspace
- **PPT-ready UI** — glassmorphism design, satellite aesthetic, metrics dashboards

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend Integration (Optional)

Set the API URL in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Start the FastAPI backend from the `backend/` directory. The workspace auto-detects API availability and falls back to demo mode.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**

## Project Structure

```
frontend/src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── workspace/page.tsx    # Reconstruction engine
│   ├── preprocessing/page.tsx
│   ├── models/page.tsx
│   ├── evaluation/page.tsx
│   ├── workflow/page.tsx
│   ├── layout.tsx            # Navbar + Footer
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ComparisonViewer.tsx
│   ├── MetricCard.tsx
│   └── ProcessingPipeline.tsx
└── lib/
    ├── constants.ts
    ├── types.ts
    └── api.ts
```

## Screenshots for PPT

Recommended pages to capture:

1. **Landing page** (`/`) — hero section with hackathon badge and stats
2. **Workspace** (`/workspace`) — upload panel + spatial render canvas with results
3. **Models** (`/models`) — architecture comparison with SSIM bar chart
4. **Evaluation** (`/evaluation`) — metrics grid + before/after swipe comparison
5. **Workflow** (`/workflow`) — system architecture diagram

---

Built by team **Neural Ninjas United**
