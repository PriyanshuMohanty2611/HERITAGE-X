from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime

# ─── User Models ───────────────────────────────────────────────────────────

class UserBase(BaseModel):
    name: str = Field(..., description="Full name of the user")
    email: EmailStr = Field(..., description="Unique email address")
    role: str = Field("user", description="Role: admin, researcher, tourist")
    subscription_plan: str = Field("free", description="Subscription plan")

class User(UserBase):
    password: str
    reset_token: Optional[str] = None
    token_expiry: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

# ─── Heritage Management ────────────────────────────────────────────────────

class HeritageSite(BaseModel):
    name: str
    country: str
    location_lat: float
    location_long: float
    era: str
    architecture_style: str
    heritage_type: str
    description: str
    health_score: float

class Monument(BaseModel):
    site_id: Optional[str] = None  # MongoDB ObjectId string
    name: str
    construction_year: str
    architectural_style: str
    material: str
    current_condition: str

class SensorData(BaseModel):
    monument_id: str
    temperature: float
    humidity: float
    pollution: float
    vibration: float
    timestamp: datetime = Field(default_factory=datetime.utcnow)

# ─── Transactional ──────────────────────────────────────────────────────────

class Booking(BaseModel):
    user_email: str
    monument_id: Optional[str] = None
    booking_type: str  # virtual, physical
    user_location: str
    payment_method: str
    status: str = "confirmed"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Payment(BaseModel):
    booking_id: str
    amount: float
    currency: str = "USD"
    status: str = "completed"
    timestamp: datetime = Field(default_factory=datetime.utcnow)
