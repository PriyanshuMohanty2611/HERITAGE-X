from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os, base64, re, json
from datetime import datetime
from typing import Optional, List
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import database and models (Pydantic models)
from database import get_db
import models

# Neural Caching Layer
from fastapi_cache import FastAPICache
from fastapi_cache.backends.inmemory import InMemoryBackend
from fastapi_cache.decorator import cache

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

# ─── Initialization ──────────────────────────────────────────────────────────

@app.on_event("startup")
async def startup():
    # Primary memory-grade cache initialization
    FastAPICache.init(InMemoryBackend())
    print("🧠 Neural Cache Layer Synchronized.")

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
    
    # Static archive for demo mode
    KNOWLEDGE_ARCHIVE = {
        "varanasi": (
            "## 🕉️ Spiritual Heritage: Varanasi (Kashi)\n\n"
            "Varanasi, the 'Eternal City', is arguably the spiritual heart of India. "
            "Known as the city of Lord Shiva, it centers around the **Dashashwamedh Ghat** and the **Kashi Vishwanath Temple**.\n\n"
            "### 🏛️ Cultural Pulse:\n"
            "- **Ganga Aarti:** A synchronization of light, incense, and chant at sunset.\n"
            "- **Knowledge Hub:** Home to BHU and centuries of Sanskrit scholarship.\n\n"
            "### 🍛 Local Intel:\n"
            "- **Food:** Malaiyo (seasonal), Kachori Sabzi at Ram Bhandar, and the famous Varanasi Paan.\n"
            "- **Craft:** Exquisite Banarasi silk weaving protocols."
        ),
        "konark": (
            "## ☀️ Solar Intelligence: Konark\n\n"
            "The **Konark Sun Temple** is a 13th-century CE marvel designed as a giant chariot with 24 intricate wheels.\n\n"
            "### ⚙️ Structural Logic:\n"
            "- **Astronomy:** The wheels act as precise sundials down to minute-level accuracy.\n"
            "- **Kalinga Architecture:** Peak of the Eastern Ganga dynasty's architectural mastery.\n\n"
            "### 🚩 Visitor Protocol:\n"
            "- **Best Time:** 06:00 AM to witness the first rays striking the Sanctorum (Nata Mandir)."
        ),
        "taj mahal": (
            "## 🏛️ Symbol of Love: Taj Mahal\n\n"
            "The **Taj Mahal** in Agra is a Mughal masterpiece built by Shah Jahan. It is a UNESCO World Heritage site and one of the Seven Wonders.\n\n"
            "### 🏰 Architecture:\n"
            "- **Marble Symphony:** Built entirely of white marble with intricate inlay work (Pietra Dura).\n"
            "- **Symmetry:** Every element is perfectly symmetrical except for the tomb of the Emperor himself."
        ),
        "hampi": (
            "## 🗿 Stone Grandeur: Hampi\n\n"
            "Hampi is an open-air museum of the **Vijayanagar Empire**. It's famous for its rock-cut temples and the Vitthala Temple complex.\n\n"
            "### 🏛️ Highlights:\n"
            "- **Musical Pillars:** Pillars that emit musical notes when tapped.\n"
            "- **Stone Chariot:** An iconic representation of Vijayanagar artistry."
        ),
        "ajanta": (
            "## 🎨 Ancient Artistry: Ajanta Caves\n\n"
            "The **Ajanta Caves** are 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE.\n\n"
            "### 🖌️ Highlights:\n"
            "- **Paintings:** Famous for masterpieces of Buddhist religious art.\n"
            "- **Sculptures:** Intricately carved facades and shrines."
        )
    }

    if not api_key or api_key in ["your_gemini_api_key_here", "your-gemini-api-key-here"]:
        msg_lower = req.message.lower()
        for key, archive_response in KNOWLEDGE_ARCHIVE.items():
            if key in msg_lower:
                return {"response": archive_response + "\n\n*(Sourced from Heritage-X Local Archives)*"}
                
        # Proactive Fallback that answers "anything extra" with heritage-styled logic
        return {
            "response": (
                "## 🧭 PrinceAI Heritage Guidance\n\n"
                f"I've received your query regarding *'{req.message}'*.\n\n"
                "In **Neural Buffer Mode**, I focus on core historical nodes. Based on your request, I recommend exploring:\n"
                "- **Spiritual Centers:** Varanasi or Madurai for deep ritual insights.\n"
                "- **Architectural Marvels:** Konark, Hampi, or Khajuraho.\n"
                "- **Mughal Legacy:** Red Fort or Taj Mahal.\n\n"
                "> 💡 **System Insight:** To unlock real-time global synthesis and real-time travel intelligence, update the `GEMINI_API_KEY` in `backend/.env`. Just ask about **Konark** or **Taj Mahal** to see what I can do with local data!"
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
def login(req: AuthRequest, db = Depends(get_db)):
    if not req.email:
        raise HTTPException(status_code=400, detail="Email is required.")

    # DEV OVERRIDE: Any password works
    user = db.users.find_one({"email": req.email})
    
    if not user:
        # Create user on the fly if not exists
        user = {
            "email": req.email,
            "name": req.email.split("@")[0].title(),
            "password": req.password,
            "role": "user",
            "subscription_plan": "free",
            "created_at": datetime.utcnow()
        }
        db.users.insert_one(user)

    # MongoDB audit log
    db.audit_logs.insert_one({
        "event": "login_overlap",
        "email": req.email,
        "timestamp": datetime.utcnow(),
        "status": "success",
        "override": True
    })

    return {
        "status": "success",
        "message": "Access granted via Neural Override. Welcome.",
        "user": {"email": user["email"], "name": user["name"], "role": user.get("role", "user")}
    }

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

@app.post("/api/auth/forgot-password")
async def forgot_password(req: ForgotPasswordRequest, db = Depends(get_db)):
    user = db.users.find_one({"email": req.email})
    if not user:
        return {"status": "success", "message": "If this email is registered, a reset link will be sent."}

    import secrets
    from datetime import datetime, timedelta
    
    token = secrets.token_urlsafe(32)
    db.users.update_one(
        {"email": req.email},
        {"$set": {
            "reset_token": token,
            "token_expiry": datetime.utcnow() + timedelta(hours=1)
        }}
    )

    # SMTP Integration
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart
    from urllib.parse import urlparse

    smtp_url = os.getenv("GMAIL_SMTP_URL")
    if not smtp_url:
        return {"status": "error", "message": "SMTP not configured."}

    # Robust parsing for complex URLs with special characters (e.g. @ or # in credentials)
    try:
        if "://" in smtp_url:
            main_part = smtp_url.split("://", 1)[1]
            auth_part, host_part = main_part.rsplit("@", 1)
            smtp_user, smtp_password = auth_part.split(":", 1)
            smtp_server, port_str = host_part.split(":", 1)
            smtp_port = int(port_str)
        else:
            raise Exception("Invalid protocol")
    except Exception:
        from urllib.parse import urlparse
        parsed_url = urlparse(smtp_url)
        smtp_server = parsed_url.hostname
        smtp_port = parsed_url.port or 587
        smtp_user = parsed_url.username
        smtp_password = parsed_url.password

    if not smtp_server or not smtp_user:
        return {"status": "error", "message": "SMTP configuration is incomplete."}

    reset_link = f"http://localhost:3000/reset-password?token={token}"
    
    try:
        print(f"DEBUG: Attempting SMTP connection to {smtp_server}:{smtp_port} for user {smtp_user}...")
        
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = req.email
        msg['Subject'] = "Heritage-X Password Reset"
        
        body = f"Click the link to reset your password: {reset_link}\nThis link will expire in 1 hour."
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(smtp_server, smtp_port, timeout=15)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()

        return {"status": "success", "message": "Reset link sent to your email."}
    except Exception as e:
        print(f"SMTP Error: {str(e)}")
        return {"status": "error", "message": "Failed to send email."}

@app.post("/api/auth/reset-password")
def reset_password(req: ResetPasswordRequest, db = Depends(get_db)):
    user = db.users.find_one({"reset_token": req.token})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid token.")

    expiry = user.get("token_expiry")
    if expiry and expiry < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Expired token.")

    db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {
            "password": req.new_password,
            "reset_token": None,
            "token_expiry": None
        }}
    )

    return {"status": "success", "message": "Password updated successfully."}


class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

@app.post("/api/auth/signup")
def signup(req: SignupRequest, db = Depends(get_db)):
    if not req.email or not req.password or not req.name:
        raise HTTPException(status_code=400, detail="All fields are required.")

    existing_user = db.users.find_one({"email": req.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered.")
        
    user_doc = {
        "email": req.email,
        "name": req.name,
        "password": req.password,
        "role": "user",
        "subscription_plan": "free",
        "created_at": datetime.utcnow()
    }
    db.users.insert_one(user_doc)

    db.audit_logs.insert_one({
        "event": "signup",
        "email": req.email,
        "timestamp": datetime.utcnow(),
        "status": "success"
    })

    return {
        "status": "success",
        "message": "Account created successfully.",
        "user": {"email": req.email, "name": req.name, "role": "user"}
    }


@app.get("/api/stats/user-count")
def get_user_count(db = Depends(get_db)):
    try:
        count = db.users.count_documents({})
        return {"count": max(count, 1)} # Ensure at least 1 for UI
    except Exception as e:
        return {"count": 1, "error": str(e)}

class LogoutRequest(BaseModel):
    email: str

@app.post("/api/auth/logout")
def logout(req: LogoutRequest, db = Depends(get_db)):
    try:
        db.audit_logs.insert_one({
            "event": "logout",
            "email": req.email,
            "timestamp": datetime.utcnow(),
            "status": "success"
        })
    except Exception:
        pass
    return {"status": "success", "message": "Session terminated."}


# ─── Monuments ───────────────────────────────────────────────────────────────

# ─── New Heritage Endpoints (Neural Intelligence Layer) ──────────────────────

class BookingCreate(BaseModel):
    username: str
    monument_name: str
    date: str
    time: str
    type: str
    total_price: float

@app.post("/api/booking/create")
async def create_booking(req: BookingCreate, db = Depends(get_db)):
    try:
        booking_doc = {
            "booking_id": f"HB-{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "username": req.username,
            "monument": req.monument_name,
            "date": req.date,
            "time": req.time,
            "type": req.type,
            "price": req.total_price,
            "status": "Confirmed",
            "created_at": datetime.utcnow()
        }
        db.bookings.insert_one(booking_doc)
        return {"status": "success", "booking_id": booking_doc["booking_id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/monuments")
@cache(expire=300) # 5-minute spatial cache
async def get_monuments(db = Depends(get_db)):
    try:
        # Optimized Projection: Streamline JSON payload (No _id, explicit fields)
        monuments = list(db.monuments.find({}, {
            "_id": 0, 
            "id": 1, 
            "name": 1, 
            "location": 1, 
            "image": 1, 
            "health": 1,
            "desc": 1,
            "coords": 1
        }))
        # If DB is empty, return high-fidelity fallback set
        if not monuments:
             return [
                {
                  "id": "1",
                  "name": "Konark Sun Temple",
                  "location": "Odisha, India",
                  "image": "/assets/KONARK/konark_hero.png",
                  "desc": "13th-century CE Sun Temple at Konark, Odisha, India.",
                  "coords": {"lat": 19.8876, "lng": 86.0945},
                  "health": 82,
                  "bestTime": "06:00 AM - 10:00 AM",
                  "architecture": "Kalinga Style",
                  "history": "Built by King Narasimhadeva I of the Eastern Ganga Dynasty in 1250 CE.",
                  "videoId": "G_asU6y9b-4",
                  "query": "Konark+Sun+Temple",
                  "gallery": ["/assets/KONARK/download (1).jpg", "/assets/KONARK/download (2).jpg"],
                  "facts": ["Designed as a giant chariot with 24 wheels.", "Sundial precision within seconds."],
                  "foodIntel": [{"item": "Odia Thali", "spot": "Dalma", "price": "₹250"}]
                },
                { "id": "2", "name": "Taj Mahal", "location": "Agra, India", "image": "/assets/Taj Mahal/gettyimages-155096944-612x612.jpg", "health": 95 },
                { "id": "3", "name": "Hampi Ruins", "location": "Karnataka, India", "image": "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg", "health": 91 },
                { "id": "4", "name": "Ajanta Caves", "location": "Maharashtra, India", "image": "/assets/Ajanta Caves/ajanta-caves-5-to-8-3071.jpg", "health": 88 },
                { "id": "5", "name": "Qutub Minar", "location": "Delhi, India", "image": "/assets/Sanchi Stupa/Qutub Minar/qutub1_042717100950.jpg", "health": 94 },
                { "id": "6", "name": "Ellora Caves", "location": "Maharashtra, India", "image": "/assets/Ellora Caves/gettyimages-481998527-1024x1024.jpg", "health": 96 }
             ]
        return monuments
    except Exception as e:
        return []

# ─── Cultural Festivals Corridor ─────────────────────────────────────────────

@app.get("/api/festivals")
@cache(expire=600) # 10-minute cultural cache
async def get_festivals():
    """Returns high-fidelity cultural festival matrix for global events."""
    return [
        {
           "id": "fest1",
           "name": "Dev Deepavali",
           "location": "Varanasi, UP",
           "date": "Nov 15, 2024",
           "impact": "High-Density Spiritual Node",
           "highlight": "1M+ oil lamps on the Ganges Ghats.",
           "status": "Archival Verified",
           "icon": "✨"
        },
        {
           "id": "fest2",
           "name": "Konark Dance Festival",
           "location": "Konark, Odisha",
           "date": "Dec 1, 2024",
           "impact": "Artistic Resonance Hub",
           "highlight": "Peak classical dance fusion against the Sun Temple.",
           "status": "Active",
           "icon": "💃"
        },
        {
           "id": "fest3",
           "name": "Hampi Utsav",
           "location": "Hampi, Karnataka",
           "date": "Jan 27, 2025",
           "impact": "Imperial Grandeur Revival",
           "highlight": "Light show illuminating the chariot matrix.",
           "status": "Upcoming",
           "icon": "🐘"
        }
    ]

# ─── Monument Image Identification (Gemini Vision) ───────────────────────────

@app.post("/api/monument/identify")
async def identify_monument(file: UploadFile = File(...), language: str = "English"):
    """
    Accepts a monument image upload and returns:
    - Monument name (Translated)
    - Location (Translated)
    - Construction period (Translated)
    - Architecture style (Translated)
    - Historical significance (Translated)
    - Threats & conservation status (Translated)
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key in ["your_gemini_api_key_here", "your-gemini-api-key-here"]:
        # High-Fidelity Neural Fallback for Demo
        return {
            "name": "Konark Sun Temple (Simulated)",
            "location": "Puri, Odisha, India",
            "period": "13th Century CE (1250)",
            "style": "Kalinga Architecture (Panchanatha)",
            "civilization": "Eastern Ganga Dynasty",
            "significance": "A masterpiece of Kalinga architecture, designed as a 24-wheeled chariot of the Sun God. Famous for its sundial precision and intricate stone carvings.",
            "threats": ["Salt-air corrosion", "Sand foundation shifting"],
            "conservation": "UNESCO World Heritage Site / ASI Protected",
            "heritage_score": 92,
            "fun_fact": "The 24 wheels are not just markers; they are precise sundials that can calculate time down to the minute."
        }

    try:
        image_bytes = await file.read()
        image_b64 = base64.b64encode(image_bytes).decode("utf-8")
        mime_type = file.content_type or "image/jpeg"

        from google import genai
        from google.genai import types

        client = genai.Client(api_key=api_key)

        prompt = """You are an expert archaeologist and heritage conservationist analysing a monument photograph.

Identify the monument in this image and respond ONLY with a valid JSON object in the following format. 
IMPORTANT: All text fields (name, location, period, style, civilization, significance, fun_fact) MUST be written in {language}.
Respond with raw JSON (no markdown, no explanation):
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
    language: Optional[str] = "English"

@app.post("/api/monument/survey")
async def extract_survey_data(req: SurveyRequest):
    """
    Given a monument name, returns detailed archaeological and structural
    survey data extracted from Gemini's knowledge base.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key in ["your_gemini_api_key_here", "your-gemini-api-key-here"]:
        # Simulated GPR Data for Demo
        return {
            "gpr_findings": "Sub-surface scans reveal deep-level drainage nodes and iron-clamp reinforcements at 12m depth. Structural integrity in the Sanctorum remains stable due to magnetic balance.",
            "structural_integrity": 82,
            "estimated_foundation_depth_m": 15,
            "material_composition": ["Khandolite Stone", "Chlorite", "Iron Clamps"],
            "damage_zones": ["North-East Corner", "Upper Tier Chhajja"],
            "restoration_recommendations": ["Salt-reversal chemical coating", "Magnetic field stabilization check"],
            "last_survey_year": 2024,
            "survey_agency": "Heritage-X Autonomous Scan (Simulated)",
            "pollution_index": 12,
            "humidity_risk": "High (Coastal Node)",
            "tourist_pressure": "High",
            "what_to_do": "Observe the first light hitting the Nata Mandir at dawn.",
            "where_to_go": "Wheel #7 on the south side for maximum geometric precision.",
            "timeline": [
                {"year": "1250 CE", "event": "Peak Construction under Narasimhadeva I"},
                {"year": "1568 CE", "event": "System Breach (Kalapahad Incursion)"},
                {"year": "1903 CE", "event": "Archaeological Seal by British Government"},
                {"year": "2024 CE", "event": "Digital Preservation via Heritage-X"}
            ]
        }

    try:
        from google import genai
        from google.genai import types
        import json, re

        client = genai.Client(api_key=api_key)

        prompt = f"""You are a senior archaeologist and cultural travel guide writing a professional survey report.
Provide a detailed survey and visitor guide for: {req.monument_name}

IMPORTANT: All text fields (gpr_findings, material_composition, restoration_recommendations, what_to_do, where_to_go, timeline events) MUST be written in {req.language}.

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
