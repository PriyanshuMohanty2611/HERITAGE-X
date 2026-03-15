import os
from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# ─── PostgreSQL Setup ───────────────────────────────────────────────────────
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:admin@localhost:5432/NIT")

try:
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        pool_pre_ping=True,       # test connection before using it
        pool_recycle=1800,        # recycle connections every 30 min
        connect_args={}
    )
    # verify connectivity immediately
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    print("✅ PostgreSQL connected successfully.")
except Exception as e:
    print(f"⚠️  PostgreSQL connection failed: {e}")
    print("    Falling back to SQLite (dev mode).")
    SQLALCHEMY_DATABASE_URL = "sqlite:///./heritage_fallback.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ─── MongoDB Setup ──────────────────────────────────────────────────────────
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
mongo_client = None
mongo_db = None

try:
    from pymongo import MongoClient
    mongo_client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=3000)
    # Force a ping to verify connection
    mongo_client.admin.command("ping")
    mongo_db = mongo_client["heritage_x_db"]
    print("✅ MongoDB connected successfully.")
except Exception as e:
    print(f"⚠️  MongoDB connection warning (non-critical): {e}")
    print("    MongoDB features will be skipped gracefully.")
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
