from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    role = Column(String, default="user") # admin, researcher, tourist
    subscription_plan = Column(String, default="free")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class HeritageSite(Base):
    __tablename__ = "heritage_sites"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    country = Column(String)
    location_lat = Column(Float)
    location_long = Column(Float)
    era = Column(String)
    architecture_style = Column(String)
    heritage_type = Column(String)
    description = Column(String)
    health_score = Column(Float)

    monuments = relationship("Monument", back_populates="site")

class Monument(Base):
    __tablename__ = "monuments"

    id = Column(Integer, primary_key=True, index=True)
    site_id = Column(Integer, ForeignKey("heritage_sites.id"))
    name = Column(String, index=True)
    construction_year = Column(String)
    architectural_style = Column(String)
    material = Column(String)
    current_condition = Column(String)

    site = relationship("HeritageSite", back_populates="monuments")
    sensor_data = relationship("SensorData", back_populates="monument")

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    monument_id = Column(Integer, ForeignKey("monuments.id"))
    temperature = Column(Float)
    humidity = Column(Float)
    pollution = Column(Float)
    vibration = Column(Float)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    monument = relationship("Monument", back_populates="sensor_data")

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    monument_id = Column(Integer, ForeignKey("monuments.id"))
    booking_type = Column(String) # virtual, physical
    status = Column(String, default="confirmed")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"))
    amount = Column(Float)
    currency = Column(String, default="USD")
    status = Column(String, default="completed")
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
