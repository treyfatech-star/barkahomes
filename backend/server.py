from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Barka Royal Homes API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=40)
    message: str = Field(min_length=1, max_length=4000)


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class NewsletterCreate(BaseModel):
    email: EmailStr


class NewsletterSubscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Barka Royal Homes API", "status": "ok"}


@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    obj = Contact(**payload.model_dump())
    doc = obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contact_submissions.insert_one(doc)
    return obj


@api_router.get("/contact", response_model=List[Contact])
async def list_contacts():
    docs = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            try:
                d["created_at"] = datetime.fromisoformat(d["created_at"])
            except ValueError:
                pass
    return docs


@api_router.post("/newsletter", response_model=NewsletterSubscriber)
async def subscribe_newsletter(payload: NewsletterCreate):
    existing = await db.newsletter_subscribers.find_one({"email": payload.email})
    if existing:
        # idempotent: return existing record
        existing.pop("_id", None)
        if isinstance(existing.get("created_at"), str):
            try:
                existing["created_at"] = datetime.fromisoformat(existing["created_at"])
            except ValueError:
                pass
        return existing

    sub = NewsletterSubscriber(email=payload.email)
    doc = sub.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.newsletter_subscribers.insert_one(doc)
    return sub


@api_router.get("/newsletter", response_model=List[NewsletterSubscriber])
async def list_newsletter():
    docs = await db.newsletter_subscribers.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            try:
                d["created_at"] = datetime.fromisoformat(d["created_at"])
            except ValueError:
                pass
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
