from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class ChecklistItemBase(BaseModel):
    text: str
    completed: bool = False

class ChecklistItemCreate(ChecklistItemBase):
    pass

class ChecklistItem(ChecklistItemBase):
    id: int
    checklist_id: int

    class Config:
        from_attributes = True

class ChecklistBase(BaseModel):
    title: str
    description: Optional[str] = None

class ChecklistCreate(ChecklistBase):
    pass

class Checklist(ChecklistBase):
    id: int
    created_at: datetime
    user_id: int
    items: List[ChecklistItem] = []

    class Config:
        from_attributes = True