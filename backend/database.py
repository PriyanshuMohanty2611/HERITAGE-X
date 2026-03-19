import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

# ─── MongoDB Setup ──────────────────────────────────────────────────────────
# Check for common SaaS naming conventions
MONGO_URL = os.getenv("MONGO_URL") or os.getenv("MONGODB_URI") or "mongodb://localhost:27017"
mongo_client = None
mongo_db = None

try:
    print(f"📡 Attempting MongoDB link...")
    mongo_client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
    # Ping check
    mongo_client.admin.command("ping")
    mongo_db = mongo_client["heritage_x_db"]
    print("✅ MongoDB connected successfully.")
except Exception as e:
    print(f"❌ Error connecting to MongoDB: {e}")
    # In a real app we might want to exit here if DB is critical
    mongo_client = None
    mongo_db = None

# ─── Dependency Injectors ───────────────────────────────────────────────────
def get_db():
    """Returns the primary MongoDB database instance."""
    if mongo_db is None:
        raise Exception("Database connection not established.")
    return mongo_db

def get_mongo():
    """Legacy alias for get_db"""
    return get_db()
