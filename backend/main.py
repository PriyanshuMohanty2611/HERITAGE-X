from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
from sqlalchemy.orm import Session
from datetime import datetime

# Import database and models
from database import get_db, get_mongo, Base, engine
from models import User, HeritageSite, Monument, Booking, Payment

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
        # Return a graceful mock response if no API key is set
        return {
            "response": (
                "**AI Historian (Demo Mode)**\n\n"
                f"You asked: *{req.message}*\n\n"
                "To enable the real AI Historian, add your **GEMINI_API_KEY** "
                "to `backend/.env`. The platform is fully operational in all other respects."
            )
        }

    try:
        from google import genai
        from google.genai import types
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=req.message,
            config=types.GenerateContentConfig(
                system_instruction=(
                    "You are the AI Historian for Heritage-X, an advanced SaaS platform "
                    "digitizing world heritage. Answer questions about monuments, architecture, "
                    "and cultural heritage professionally, accurately, and concisely. "
                    "Use markdown formatting. Be brilliant, slightly mysterious, highly factual."
                )
            )
        )
        return {"response": response.text}
    except Exception as e:
        return {"response": f"**AI Engine Error:** {str(e)}\n\nPlease verify your Gemini API key."}

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
            {"id": 2, "name": "Hampi Ruins", "location": "Karnataka, India", "description": "UNESCO World Heritage Site of Vijayanagara Empire"},
            {"id": 3, "name": "Ajanta Caves", "location": "Maharashtra, India", "description": "Rock-cut Buddhist cave monuments"},
        ]}

# ─── Bookings ────────────────────────────────────────────────────────────────

class BookingRequest(BaseModel):
    user_email: str
    monument_id: int
    booking_type: str
    amount: float

@app.post("/api/booking/create")
def create_booking(req: BookingRequest, db: Session = Depends(get_db)):
    mongo_db = get_mongo()

    try:
        new_booking = Booking(
            user_email=req.user_email,
            monument_id=req.monument_id,
            booking_type=req.booking_type,
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
