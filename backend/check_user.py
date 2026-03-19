from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = MongoClient(MONGO_URL)
db = client["heritage_x_db"]

user = db.users.find_one({"email": "priyanshumohanty2611@gmail.com"})
if user:
    print(f"FOUND USER: {user['email']}")
    print(f"PASSWORD IN DB: {user['password']}")
else:
    print("USER NOT FOUND. Creating user...")
    db.users.insert_one({
        "email": "priyanshumohanty2611@gmail.com",
        "name": "Priyanshu Mohanty",
        "password": "password123", # Default password for the user to try
        "role": "admin"
    })
    print("USER CREATED with password: password123")
