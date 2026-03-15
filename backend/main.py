from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from google import genai
from google.genai import types

app = FastAPI(
    title="HERITAGE-X API",
    description="Backend API for Heritage-X Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to HERITAGE-X API. Journey through time begins here."}

@app.get("/health")
def health_check():
    return {"status": "ok", "system": "HERITAGE-X Backend"}

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_historian(req: ChatRequest):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured on the server.")
    
    try:
        client = genai.Client(api_key=api_key)
        
        # We craft a powerful system instruction to act as Heritage-X AI
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=req.message,
            config=types.GenerateContentConfig(
                system_instruction="You are the AI Historian for Heritage-X, an advanced SaaS platform digitizing world heritage. You answer questions about historical monuments, architecture, and cultural heritage professionally, accurately, and concisely. Use markdown formatting to organize your response. Do not break character. Be a brilliant, slightly mysterious, but highly factual historian."
            )
        )
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
