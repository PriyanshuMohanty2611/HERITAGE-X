import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# ─── SQLite Setup (Simplified & Local) ──────────────────────────────────────
# Using SQLite only as requested to avoid pgAdmin/PostgreSQL setup issues
SQLALCHEMY_DATABASE_URL = "sqlite:///./heritage_x.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)
print("✅ SQLite Engine Initialized (Local Database).")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ─── MongoDB Setup ──────────────────────────────────────────────────────────
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
mongo_client = None
mongo_db = None

try:
    from pymongo import MongoClient
    mongo_client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=2000)
    # Ping check
    mongo_client.admin.command("ping")
    mongo_db = mongo_client["heritage_x_db"]
    print("✅ MongoDB connected successfully.")
except Exception:
    print("⚠️  MongoDB offline. Running in single-database (SQLite) mode.")
    mongo_client = None
    mongo_db = None

# ─── Dependency Injectors ───────────────────────────────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_mongo():
    return mongo_db
