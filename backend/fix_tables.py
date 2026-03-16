from database import engine, Base
from models import Booking, Payment

print("Dropping and recreating Booking and Payment tables...")
Payment.__table__.drop(engine, checkfirst=True)
Booking.__table__.drop(engine, checkfirst=True)
Booking.__table__.create(engine)
Payment.__table__.create(engine)
print("Tables recreated successfully!")
