import json
from database import SessionLocal
from models import Recipe
import math

with open("US_recipes_null.json", "r") as f:
    data = json.load(f)

db = SessionLocal()
for key, value in data.items():
    def clean_num(x): return None if x is None or isinstance(x, str) and (x.lower() == 'nan') else x
    db_recipe = Recipe(
        cuisine=value.get("cuisine"),
        title=value.get("title"),
        rating=clean_num(value.get("rating")),
        prep_time=clean_num(value.get("prep_time")),
        cook_time=clean_num(value.get("cook_time")),
        total_time=clean_num(value.get("total_time")),
        description=value.get("description"),
        nutrients=value.get("nutrients"),
        serves=value.get("serves")
    )
    db.add(db_recipe)
db.commit()
db.close()
