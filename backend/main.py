from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="LISS-IV GenAI Cloud Removal Backend")

# Enable CORS so your Next.js frontend on Vercel can communicate with it safely
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your Vercel URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "healthy", "message": "LISS-IV Cloud Removal Core API is operational"}

@app.post("/api/reconstruct")
async def reconstruct_image(
    optical_image: UploadFile = File(...), 
    sar_image: UploadFile = File(None)
):
    """
    Endpoint to receive cloudy LISS-IV imagery and auxiliary SAR imagery,
    and return the reconstructed cloud-free scene.
    """
    try:
        # Placeholder for upcoming validation and inference logic
        return {
            "message": "Files received successfully",
            "optical_filename": optical_image.filename,
            "sar_filename": sar_image.filename if sar_image else "None provided"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)