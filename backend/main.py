from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from google import genai
from google.genai import types
from sqlalchemy.orm import Session
from datetime import datetime

# Import database and models
from database import get_db, get_mongo
from models import User, HeritageSite, Monument, SensorData, Booking, Payment

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

# --- AI Chat ---
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

# --- Auth Actions (Login/Logout storing in DB & Mongo) ---
class AuthRequest(BaseModel):
    email: str
    password: str

@app.post("/api/auth/login")
def login(req: AuthRequest, db: Session = Depends(get_db)):
    mongo_db = get_mongo()
    
    # Normally hash check here, we mock successful admin override
    if req.email and req.password:
        
        # Determine if user exists in Postgres
        user = db.query(User).filter(User.email == req.email).first()
        if not user:
            user = User(email=req.email, name="Admin Alpha", role="admin", subscription_plan="enterprise")
            db.add(user)
            db.commit()
            db.refresh(user)

        # Log into MONGODB
        if mongo_db is not None:
            login_event = {
                "event": "login",
                "email": req.email,
                "timestamp": datetime.utcnow(),
                "ip_address": "127.0.0.1",
                "status": "success"
            }
            mongo_db["audit_logs"].insert_one(login_event)

        return {"status": "success", "message": "Biometric link confirmed. Welcome Admin.", "user": {"email": user.email, "role": user.role}}
    
    raise HTTPException(status_code=401, detail="Invalid credentials.")

@app.post("/api/auth/logout")
def logout(req: AuthRequest, db: Session = Depends(get_db)):
    mongo_db = get_mongo()

    if mongo_db is not None:
        logout_event = {
            "event": "logout",
            "email": req.email,
            "timestamp": datetime.utcnow(),
            "status": "success"
        }
        mongo_db["audit_logs"].insert_one(logout_event)
        
    return {"status": "success", "message": "Disconnected from network."}

# --- Booking & Payment System (saving to PG & Mongo) ---
class BookingRequest(BaseModel):
    user_email: str
    monument_id: int
    booking_type: str
    amount: float

@app.post("/api/booking/create")
def create_booking(req: BookingRequest, db: Session = Depends(get_db)):
    mongo_db = get_mongo()

    # Create Booking in Postgres
    new_booking = Booking(
        user_email=req.user_email,
        monument_id=req.monument_id,
        booking_type=req.booking_type,
        status="confirmed"
    )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    # Create Payment in Postgres
    new_payment = Payment(
        booking_id=new_booking.id,
        amount=req.amount,
        status="completed"
    )
    db.add(new_payment)
    db.commit()
    db.refresh(new_payment)

    # Sync complete Document to MongoDB for fast analytical querying
    if mongo_db is not None:
        mongo_booking_doc = {
            "booking_id": new_booking.id,
            "user_email": req.user_email,
            "monument_id": req.monument_id,
            "booking_type": req.booking_type,
            "payment": {
                "payment_id": new_payment.id,
                "amount": req.amount,
                "currency": "USD",
                "status": "completed"
            },
            "timestamp": datetime.utcnow(),
            "synced_from_pg": True
        }
        mongo_db["bookings_records"].insert_one(mongo_booking_doc)

    return {"status": "success", "booking_id": new_booking.id, "message": "Virtual/Physical Pass securely generated and synced across relational & NoSQL nodes."}
