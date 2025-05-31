from fastapi import FastAPI, Depends, Query
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import crud
from fastapi.middleware.cors import CORSMiddleware
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/recipes", response_model=list[schemas.RecipeOut])
def get_all_recipes(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    skip = (page - 1) * limit
    return crud.get_recipes(db, skip=skip, limit=limit)

@app.get("/api/recipes/search", response_model=list[schemas.RecipeOut])
def search(
    title: str = "",
    cuisine: str = "",
    rating: str = "",
    calories: str = "",
    db: Session = Depends(get_db)
):
    
    rating_val = float(rating) if rating not in (None, "") else None
    calories_val = float(calories) if calories not in (None, "") else None
    return crud.search_recipes(db, title, cuisine, calories_val, rating_val)
