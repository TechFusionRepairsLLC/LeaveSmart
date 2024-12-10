from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import SessionLocal, engine
from auth import get_current_user

app = FastAPI()

# Create database tables
models.Base.metadata.create_all(bind=engine)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/checklists/", response_model=schemas.Checklist)
def create_checklist(
    checklist: schemas.ChecklistCreate,
    current_user: schemas.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_checklist = models.Checklist(**checklist.dict(), user_id=current_user.id)
    db.add(db_checklist)
    db.commit()
    db.refresh(db_checklist)
    return db_checklist

@app.get("/checklists/", response_model=List[schemas.Checklist])
def get_checklists(
    current_user: schemas.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(models.Checklist).filter(models.Checklist.user_id == current_user.id).all()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)