🌍 SkySweep AI

Advanced Multi-Modal Satellite Cloud Removal Framework

SkySweep AI is a state-of-the-art geospatial application designed to reconstruct cloud-obscured satellite imagery, specifically tuned for the complex and rugged terrain of the North Eastern Region (NER). By fusing Sentinel-1 Synthetic Aperture Radar (SAR) data with high-resolution LISS-IV optical imagery, SkySweep AI reveals the true ground topography beneath severe atmospheric interference.

✨ Key Features

🛰️ Optical-SAR Fusion: Leverages cloud-penetrating Sentinel-1 radar data as a structural baseline to perfectly align and reconstruct missing LISS-IV optical pixels.

🧠 5-Model AI Suite: A robust testing and inference pipeline supporting multiple cutting-edge generative architectures:

Swin-Transformer (High Fidelity)

Hybrid cGAN (Fast Spatial Mapping)

Standard Pix2Pix Generator Core

CycleGAN (Unpaired Feature Translation)

U-Net Attention Baseline

🏞️ Topographic Accuracy: Specifically optimized to preserve geographic fidelity, including dense forest canopies, riverbeds, and mountainous ridges.

💻 Interactive Dashboard: A premium multi-page UI built with Next.js and Tailwind CSS. Features landing page with problem statement, reconstruction workspace, preprocessing pipeline, model comparison, evaluation metrics, and operational workflow documentation. Includes navbar, footer, drag-and-drop ingestion, before/after comparison (slider & split-view), and processing pipeline visualization.

📱 Frontend Pages

Home — Problem statement, datasets, expected outcomes, and hackathon context

Workspace — Upload LISS-IV/SAR imagery, select GenAI model, run reconstruction, export GeoTIFF

Preprocessing — Interactive 6-step data pipeline (Bhoonidhi ingestion → cloud masks → co-registration)

Models — Comparative benchmark of 6 GenAI architectures with SSIM/PSNR/SAM metrics

Evaluation — Quantitative and qualitative assessment across NER study regions

Workflow — System architecture, deployment steps, and tech stack overview

🛠️ Tech Stack

Frontend: Next.js (React), TypeScript, Tailwind CSS

Backend: Python, FastAPI (API endpoints for model inference)

AI/Deep Learning: PyTorch, torchvision

Geospatial Processing: GDAL, Rasterio

Deployment: Vercel (Frontend), GitHub (Version Control)

🚀 Getting Started (Local Development)

Follow these steps to run the SkySweep AI dashboard on your local machine.

Prerequisites

Node.js (v18 or higher)

Python (3.9 or higher)

Git

1. Clone the Repository

git clone [https://github.com/YOUR_USERNAME/skysweep-ai.git](https://github.com/YOUR_USERNAME/skysweep-ai.git)
cd skysweep-ai


2. Frontend Setup

Navigate to the frontend directory and install the required dependencies:

cd frontend
npm install


Start the Next.js development server:

npm run dev


Open http://localhost:3000 in your browser to view the application.

3. Backend Setup (AI Inference API)

(Note: Ensure you have your virtual environment activated, e.g., using Conda)
Navigate to the backend directory and install the Python dependencies:

cd ../backend
pip install -r requirements.txt


Start the FastAPI server:

uvicorn main:app --reload


📖 How to Use the Dashboard

Home Page: Overview of the problem statement, datasets, and expected outcomes for Bhartiya Antriksh Hackathon 2026.

Enter Workspace: Navigate to "Workspace" or click "Launch Reconstruction Engine".

Data Ingestion: Upload cloudy LISS-IV .tif file and optional Sentinel-1 SAR baseline. Toggle auxiliary fusion layers (S2, DEM, temporal reference, cloud mask).

Select Architecture: Choose from 6 GenAI models (Diffusion, Swin-Transformer, Hybrid cGAN, Pix2Pix, CycleGAN, U-Net+Attention).

Run Reconstruction: Click "Run Geographic Reconstruction" to initiate the AI pipeline with live processing stage visualization.

Analyze Results: Use the Spatial Render Canvas to compare input and output. Toggle between "Swipe Comparison" and "Side by Side" modes. Review SSIM, PSNR, SAM, and geographic fidelity metrics.

Explore Further: Visit Preprocessing, Models, Evaluation, and Workflow pages for the complete pipeline documentation.

👥 Team

Built by team Neural Ninjas United — Bhartiya Antriksh Hackathon 2026

🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📄 License

This project is licensed under the MIT License.