from pydantic import BaseModel
from typing import Optional, Dict

class RecipeBase(BaseModel):
    pass

class RecipeOut(BaseModel):
    id: int
    cuisine: Optional[str]
    title: Optional[str]
    rating: Optional[float]
    prep_time: Optional[int]
    cook_time: Optional[int]
    total_time: Optional[int]
    description: Optional[str]
    nutrients: Optional[dict]
    serves: Optional[str]

    class Config:
        orm_mode = True
