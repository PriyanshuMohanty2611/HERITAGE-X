from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os, base64, re, json
from sqlalchemy.orm import Session
from datetime import datetime

# Import database and models
from database import get_db, get_mongo, Base, engine
from models import User, HeritageSite, Monument, Booking, Payment

from typing import Optional

# Auto-create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HERITAGE-X API",
    description="Backend API for the Heritage-X cultural intelligence platform.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Root & Health ──────────────────────────────────────────────────────────

@app.get("/")
def read_root():
    return {"message": "HERITAGE-X API v2.0 — Journey through time begins here."}

@app.get("/health")
def health_check():
    return {"status": "ok", "system": "HERITAGE-X Backend", "timestamp": datetime.utcnow().isoformat()}

# ─── AI Chat ────────────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_historian(req: ChatRequest):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "your-gemini-api-key-here":
        return {
            "response": (
                "**AI Historian (Demo Mode)**\n\n"
                f"You asked: *{req.message}*\n\n"
                "Add your **GEMINI_API_KEY** to `backend/.env` to enable the real AI."
            )
        }

    SYSTEM = (
        "You are PrinceAI, the core intelligence behind Heritage-X and your Indian Compass. "
        "You guide users through India's cultural and spiritual heritage. "
        "When suggesting travel plans or budget guidance, PROVIDE SPECIFIC FOOD RECOMMENDATIONS & PRICES based on real data: "
        "- **Agra (Taj Mahal):** Mughlai cuisine (Butter Chicken, Rogan Josh), Petha from Panchhi Petha. Joney's Place (avg ₹500 for two). "
        "- **Konark:** Fresh seafood (Prawn Rolls), Odia Thali (INR 100-200) at Hotel Chandrabhaga. "
        "- **Hampi:** South Indian Thalis on banana leaves at Mango Tree (₹200-300). Filter coffee (₹30-80). "
        "- **Madurai:** Idli/Dosa at Hotel Sree Sabarees (₹80-90). Paruthi Paal (₹20). "
        "- **Amritsar:** Amritsari Kulcha at Bharawan Da Dhaba (₹250). Jalebis at Gurudas Ram. "
        "Be helpful, brilliant, and ensure markdown formatting for a premium experience. Never break character."
    )

    # Try models in preferred order — gemini-2.5-flash confirmed working
    MODELS = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"]
    last_error = ""

    try:
        from google import genai
        from google.genai import types
        client = genai.Client(api_key=api_key)

        for model_name in MODELS:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=req.message,
                    config=types.GenerateContentConfig(system_instruction=SYSTEM)
                )
                print(f"✅ Chat answered by {model_name}")
                return {"response": response.text, "model": model_name}
            except Exception as model_err:
                last_error = str(model_err)
                print(f"⚠️  {model_name} failed: {model_err}")
                continue

        # All models failed
        return {"response": f"**All Gemini models unavailable.**\n\nLast error: `{last_error}`\n\nCheck your API key and quota."}

    except Exception as e:
        print(f"❌ Chat endpoint error: {e}")
        return {"response": f"**AI Error:** {str(e)}"}

# ─── Authentication ──────────────────────────────────────────────────────────

class AuthRequest(BaseModel):
    email: str
    password: str

@app.post("/api/auth/login")
def login(req: AuthRequest, db: Session = Depends(get_db)):
    mongo_db = get_mongo()

    if not req.email or not req.password:
        raise HTTPException(status_code=400, detail="Email and password are required.")

    try:
        user = db.query(User).filter(User.email == req.email).first()
        if not user:
            user = User(
                email=req.email,
                name="Heritage Explorer",
                role="admin",
                subscription_plan="enterprise"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    # MongoDB audit log (non-blocking)
    if mongo_db is not None:
        try:
            mongo_db["audit_logs"].insert_one({
                "event": "login",
                "email": req.email,
                "timestamp": datetime.utcnow(),
                "status": "success"
            })
        except Exception:
            pass  # Non-critical

    return {
        "status": "success",
        "message": "Access granted. Welcome to Heritage-X.",
        "user": {"email": user.email, "name": user.name, "role": user.role}
    }

class LogoutRequest(BaseModel):
    email: str

@app.post("/api/auth/logout")
def logout(req: LogoutRequest):
    mongo_db = get_mongo()
    if mongo_db is not None:
        try:
            mongo_db["audit_logs"].insert_one({
                "event": "logout",
                "email": req.email,
                "timestamp": datetime.utcnow(),
                "status": "success"
            })
        except Exception:
            pass
    return {"status": "success", "message": "Session terminated."}

# ─── Monuments ───────────────────────────────────────────────────────────────

@app.get("/api/monuments")
def get_monuments(db: Session = Depends(get_db)):
    try:
        monuments = db.query(Monument).all()
        return {"monuments": [
            {"id": m.id, "name": m.name, "location": m.location, "description": m.description}
            for m in monuments
        ]}
    except Exception:
        # Return hardcoded data if DB fails
        return {"monuments": [
            {"id": 1, "name": "Konark Sun Temple", "location": "Odisha, India", "description": "13th-century temple of the Sun God", "health": 82},
            {"id": 2, "name": "Taj Mahal", "location": "Agra, India", "description": "Ivory-white marble mausoleum", "health": 95},
            {"id": 3, "name": "Hampi Ruins", "location": "Karnataka, India", "description": "UNESCO World Heritage Site of Vijayanagara Empire", "health": 91},
            {"id": 4, "name": "Ajanta Caves", "location": "Maharashtra, India", "description": "Rock-cut Buddhist cave monuments", "health": 88},
            {"id": 5, "name": "Qutub Minar", "location": "Delhi, India", "description": "World's tallest brick minaret", "health": 94},
            {"id": 6, "name": "Ellora Caves", "location": "Maharashtra, India", "description": "Largest monolithic rock excavation", "health": 96},
            {"id": 7, "name": "Khajuraho Temples", "location": "Madhya Pradesh, India", "description": "Nagara-style architectural masterpiece", "health": 89},
            {"id": 8, "name": "Harmandir Sahib", "location": "Punjab, India", "description": "The Golden Temple of Amritsar", "health": 98},
            {"id": 9, "name": "Meenakshi Temple", "location": "Tamil Nadu, India", "description": "Dravidian-style temple of Madurai", "health": 92},
            {"id": 10, "name": "Mahabalipuram", "location": "Tamil Nadu, India", "description": "Pallava-era shore temples", "health": 87},
            {"id": 11, "name": "Sanchi Stupa", "location": "Madhya Pradesh, India", "description": "Mauryan-era Buddhist monument", "health": 93},
            {"id": 12, "name": "Victoria Memorial", "location": "West Bengal, India", "description": "Indo-Saracenic marble monument", "health": 91}
        ]}

# ─── Bookings ────────────────────────────────────────────────────────────────

class BookingRequest(BaseModel):
    user_email: str
    monument_id: int
    booking_type: str
    amount: float
    location: Optional[str] = None
    payment_method: Optional[str] = None

@app.post("/api/booking/create")
def create_booking(req: BookingRequest, db: Session = Depends(get_db)):
    mongo_db = get_mongo()

    try:
        new_booking = Booking(
            user_email=req.user_email,
            monument_id=req.monument_id,
            booking_type=req.booking_type,
            user_location=req.location,
            payment_method=req.payment_method,
            status="confirmed"
        )
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)

        new_payment = Payment(
            booking_id=new_booking.id,
            amount=req.amount,
            status="completed"
        )
        db.add(new_payment)
        db.commit()
        db.refresh(new_payment)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Booking failed: {str(e)}")

    # MongoDB sync (non-blocking)
    if mongo_db is not None:
        try:
            mongo_db["bookings_records"].insert_one({
                "booking_id": new_booking.id,
                "user_email": req.user_email,
                "monument_id": req.monument_id,
                "booking_type": req.booking_type,
                "amount": req.amount,
                "status": "confirmed",
                "timestamp": datetime.utcnow(),
                "synced_from_pg": True
            })
        except Exception:
            pass

    return {
        "status": "success",
        "booking_id": new_booking.id,
        "message": f"Pass confirmed! Booking #{new_booking.id} synced to PostgreSQL & MongoDB."
    }

# ─── Monument Image Identification (Gemini Vision) ───────────────────────────

@app.post("/api/monument/identify")
async def identify_monument(file: UploadFile = File(...)):
    """
    Accepts a monument image upload and returns:
    - Monument name
    - Location
    - Construction period
    - Architecture style
    - Historical significance
    - Threats & conservation status
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "your-gemini-api-key-here":
        return {
            "name": "Demo Mode",
            "location": "Set GEMINI_API_KEY in backend/.env",
            "period": "Unknown",
            "style": "Unknown",
            "significance": "AI identification requires a valid Gemini API key.",
            "threats": [],
            "conservation": "N/A",
            "heritage_score": 0
        }

    try:
        image_bytes = await file.read()
        image_b64 = base64.b64encode(image_bytes).decode("utf-8")
        mime_type = file.content_type or "image/jpeg"

        from google import genai
        from google.genai import types

        client = genai.Client(api_key=api_key)

        prompt = """You are an expert archaeologist and heritage conservationist analysing a monument photograph.

Identify the monument in this image and respond ONLY with a valid JSON object in the following format (no markdown, no explanation, just raw JSON):
{
  "name": "Full official monument name",
  "location": "City, State/Region, Country",
  "period": "Construction period e.g. 13th century CE",
  "style": "Architectural style e.g. Kalinga Architecture",
  "civilization": "Civilization or dynasty that built it",
  "significance": "2-3 sentence historical significance",
  "threats": ["threat1", "threat2"],
  "conservation": "UNESCO / ASI / Unprotected",
  "heritage_score": 85,
  "fun_fact": "One fascinating little-known fact"
}

If you cannot identify the monument, still return the JSON with best guesses and "heritage_score": 0."""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Part.from_bytes(data=image_bytes, mime_type=mime_type),
                types.Part.from_text(text=prompt)
            ]
        )

        import json, re
        raw = response.text.strip()
        # Strip markdown fences if present
        raw = re.sub(r"```json|```", "", raw).strip()
        result = json.loads(raw)
        return result

    except Exception as e:
        return {
            "name": "Identification Failed",
            "location": "Unknown",
            "period": "Unknown",
            "style": "Unknown",
            "civilization": "Unknown",
            "significance": f"Error during analysis: {str(e)}",
            "threats": [],
            "conservation": "Unknown",
            "heritage_score": 0,
            "fun_fact": ""
        }


# ─── Monument Survey Data Extraction (Gemini Research) ──────────────────────

class SurveyRequest(BaseModel):
    monument_name: str

@app.post("/api/monument/survey")
async def extract_survey_data(req: SurveyRequest):
    """
    Given a monument name, returns detailed archaeological and structural
    survey data extracted from Gemini's knowledge base.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "your-gemini-api-key-here":
        return {"error": "Gemini API key not configured."}

    try:
        from google import genai
        from google.genai import types
        import json, re

        client = genai.Client(api_key=api_key)

        prompt = f"""You are a senior archaeologist and cultural travel guide writing a professional survey report.
Provide a detailed survey and visitor guide for: {req.monument_name}

Respond ONLY with valid JSON (no markdown, no explanation):
{{
  "gpr_findings": "Detailed Ground Penetrating Radar summary",
  "structural_integrity": 87,
  "estimated_foundation_depth_m": 12,
  "material_composition": ["Stone", "Iron Clamps"],
  "damage_zones": ["East Corridor", "Foundation Base"],
  "restoration_recommendations": ["Recommendation 1", "Recommendation 2"],
  "last_survey_year": 2024,
  "survey_agency": "Heritage-X Autonomous Scan",
  "pollution_index": 22,
  "humidity_risk": "Low",
  "tourist_pressure": "Moderate",
  "what_to_do": "Detailed sentence on the best activity there",
  "where_to_go": "Detailed sentence on the best specific spot there",
  "timeline": [
    {{"year": "500 BC", "event": "Archaeological Layer 1"}},
    {{"year": "1200 CE", "event": "Main Construction"}},
    {{"year": "2024 CE", "event": "AI Digital Twin Created"}}
  ]
}}"""

        api_key = os.getenv("GEMINI_API_KEY")
        openai_key = os.getenv("OPENAI_API_KEY")

        # Try Gemini first
        try:
            from google import genai
            client = genai.Client(api_key=api_key)
            response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
            raw = response.text.strip()
        except Exception as e:
            print(f"⚠️ Gemini survey failed: {e}. Trying OpenAI...")
            if openai_key and openai_key.startswith("sk-"):
                import openai
                client = openai.OpenAI(api_key=openai_key)
                response = client.chat.completions.create(
                    model="gpt-4o",
                    messages=[{"role": "user", "content": prompt}]
                )
                raw = response.choices[0].message.content.strip()
            else:
                raise e

        # Standard Extraction Logic
        json_match = re.search(r'\{.*\}', raw, re.DOTALL)
        if json_match:
            try:
                return json.loads(json_match.group(0))
            except:
                pass
                
        raw = re.sub(r"```json|```", "", raw).strip()
        return json.loads(raw)

    except Exception as e:
        print(f"❌ Final Survey error: {e}")
        return {"error": str(e), "gpr_findings": "Scan interrupted. Please verify API keys.", "timeline": []}
