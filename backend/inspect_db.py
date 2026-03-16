from sqlalchemy import create_engine, inspect
from database import SQLALCHEMY_DATABASE_URL

engine = create_engine(SQLALCHEMY_DATABASE_URL)
inspector = inspect(engine)

for table_name in inspector.get_table_names():
    print(f"Table: {table_name}")
    for column in inspector.get_columns(table_name):
        print(f"  Column: {column['name']} ({column['type']})")
