from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = MongoClient(MONGO_URL)
db = client["heritage_x_db"]

print(f"COLLECTIONS IN heritage_x_db: {db.list_collection_names()}")
      
user = db.users.find_one({"email": "priyanshumohanty2611@gmail.com"})
if user:
    print(f"FOUND USER IN SCRIPT: {user['email']}")
else:
    print("USER STILL NOT FOUND IN SCRIPT")
