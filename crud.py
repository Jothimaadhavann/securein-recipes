from sqlalchemy.orm import Session
from models import Recipe
from schemas import RecipeBase
from typing import Optional
from sqlalchemy import desc, cast, text
from sqlalchemy.dialects.postgresql import JSONB


def get_recipes(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Recipe).order_by(desc(Recipe.rating)).offset(skip).limit(limit).all()

def search_recipes(db: Session, title: str = "", cuisine: str = "", max_calories: Optional[float] = None, rating: Optional[float] = None):
    query = db.query(Recipe)

    if title:
        query = query.filter(Recipe.title.ilike(f"%{title}%"))
    if cuisine:
        query = query.filter(Recipe.cuisine.ilike(f"%{cuisine}%"))
    if rating:
        query = query.filter(Recipe.rating >= rating)
    if max_calories:
        # Use SQLite's json_extract to get calories from the nutrients JSON column
        query = query.filter(cast(text("json_extract(nutrients, '$.calories')"), Float) <= max_calories)

    return query.all()
