from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt as pyjwt
import asyncio
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Auth config
JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALG = "HS256"
JWT_EXPIRES_DAYS = 7
ADMIN_EMAIL = os.environ['ADMIN_EMAIL'].lower().strip()
ADMIN_PASSWORD = os.environ['ADMIN_PASSWORD']

# Email (Resend)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '').strip()
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev').strip()
# Where contact-form inquiries are emailed. Falls back to ADMIN_EMAIL if unset.
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', '').strip().lower() or ADMIN_EMAIL
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Valid service slugs (must match frontend SERVICES ids)
SERVICE_SLUGS = {
    "kitchen", "living", "bedroom", "bathroom", "dining",
    "office", "kids", "closet", "staircase", "hall", "entry",
}

# Valid portfolio category slugs (must match frontend CATEGORIES slugs)
CATEGORY_SLUGS = {
    "kitchen", "living-room", "bedroom", "bathroom", "dining",
    "office", "kids-room", "closet", "staircase", "hall", "entry",
}

app = FastAPI(title="Sahuja Interiors API")
api_router = APIRouter(prefix="/api")


# ---------- Helpers ----------
def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode(), hashed.encode())
    except Exception:
        return False


def create_access_token(email: str) -> str:
    payload = {
        "sub": email,
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(days=JWT_EXPIRES_DAYS),
        "iat": datetime.now(timezone.utc),
    }
    return pyjwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


def decode_token(token: str) -> dict:
    return pyjwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])


async def require_admin(request: Request) -> dict:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth[7:].strip()
    try:
        payload = decode_token(token)
    except pyjwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired")
    except pyjwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("role") != "admin" or payload.get("sub") != ADMIN_EMAIL:
        raise HTTPException(status_code=403, detail="Forbidden")
    return payload


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    address: Optional[str] = Field(default=None, max_length=300)
    message: str = Field(..., min_length=1, max_length=4000)


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None 
    address: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class LoginOut(BaseModel):
    access_token: str
    token_type: str = "Bearer"
    expires_in: int
    email: str


class WorkCreate(BaseModel):
    service_slug: str
    image_base64: str = Field(..., min_length=50)
    caption: Optional[str] = Field(default=None, max_length=200)


class Work(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    service_slug: str
    image_base64: str
    caption: Optional[str] = None
    created_at: datetime

class WorkerRegistrationCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(..., max_length=40)
    address: Optional[str] = Field(default=None, max_length=300)
    work_type: str = Field(..., max_length=100)
    experience: Optional[str] = Field(default=None, max_length=100)
    message: Optional[str] = Field(default=None, max_length=4000)


class WorkerRegistration(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    address: Optional[str] = None
    work_type: str
    experience: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ReferenceCreate(BaseModel):
    category_slug: str
    image_base64: str = Field(..., min_length=50)
    caption: Optional[str] = Field(default=None, max_length=200)


class Reference(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    category_slug: str
    image_base64: str
    caption: Optional[str] = None
    created_at: datetime


# ---------- Startup: seed admin ----------
@app.on_event("startup")
async def on_startup():
    # Remove any stale admin users whose email doesn't match the configured ADMIN_EMAIL
    await db.admin_users.delete_many({"email": {"$ne": ADMIN_EMAIL}})

    existing = await db.admin_users.find_one({"email": ADMIN_EMAIL}, {"_id": 0})
    if not existing:
        await db.admin_users.insert_one({
            "email": ADMIN_EMAIL,
            "password_hash": hash_password(ADMIN_PASSWORD),
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info(f"Seeded admin user {ADMIN_EMAIL}")
    elif not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
        await db.admin_users.update_one(
            {"email": ADMIN_EMAIL},
            {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}}
        )
        logger.info("Updated admin password hash from env")


# ---------- Public routes ----------
@api_router.get("/")
async def root():
    return {"message": "Sahuja Interiors API is running"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    items = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for c in items:
        if isinstance(c.get('timestamp'), str):
            c['timestamp'] = datetime.fromisoformat(c['timestamp'])
    return items


@api_router.post("/contact", response_model=Contact, status_code=201)
async def create_contact(payload: ContactCreate):
    contact = Contact(**payload.model_dump())
    doc = contact.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contacts.insert_one(doc)
    logger.info(f"New contact submission from {contact.email}")

    # Send email notification (non-blocking; failure does not break the API)
    if RESEND_API_KEY:
        try:
            html_body = f"""
            <div style="font-family: Arial, Helvetica, sans-serif; max-width:600px; margin:0 auto; color:#0A0A0A;">
              <div style="background:#0A0A0A; color:#ffffff; padding:24px 28px;">
                <div style="font-size:11px; letter-spacing:3px; color:#D4AF37; text-transform:uppercase;">Sahuja Interiors</div>
                <h1 style="margin:8px 0 0; font-weight:300; font-size:26px;">New inquiry received</h1>
              </div>
              <div style="padding:28px; background:#FAFAFA; border:1px solid #EAEAEA; border-top:none;">
                <table style="width:100%; border-collapse:collapse;">
                  <tr><td style="padding:10px 0; color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px; width:100px;">Name</td>
                      <td style="padding:10px 0; font-size:15px;">{contact.name}</td></tr>
                  <tr><td style="padding:10px 0; color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Email</td>
                      <td style="padding:10px 0; font-size:15px;"><a href="mailto:{contact.email}" style="color:#B8902B; text-decoration:none;">{contact.email}</a></td></tr>
                  <tr><td style="padding:10px 0; color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Phone</td>
                      <td style="padding:10px 0; font-size:15px;">{contact.phone or '—'}</td></tr>
                  <tr>
                  <td style="padding:10px 0; color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Address</td>
                  <td style="padding:10px 0; font-size:15px;">{contact.address or '—'} </td></tr>
                  <tr><td style="padding:10px 0; color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px; vertical-align:top;">Message</td>
                      <td style="padding:10px 0; font-size:15px; line-height:1.6; white-space:pre-wrap;">{contact.message}</td></tr>
                </table>
                <p style="margin-top:28px; font-size:12px; color:#8E8E8E;">Reply directly to this email to respond — it routes to the visitor.</p>
              </div>
            </div>
            """
            params = {
                "from": f"Sahuja Interiors <{SENDER_EMAIL}>",
                "to": [NOTIFICATION_EMAIL],
                "subject": f"New inquiry from {contact.name} — Sahuja Interiors",
                "html": html_body,
                "reply_to": contact.email,
            }
            await asyncio.to_thread(resend.Emails.send, params)
            logger.info(f"Notification email sent to {NOTIFICATION_EMAIL}")
        except Exception as e:
            logger.error(f"Resend failed (contact still saved): {e}")
    else:
        logger.warning("RESEND_API_KEY not set — skipping email notification")

    return contact


@api_router.get("/contacts", response_model=List[Contact])
async def list_contacts():
    items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for c in items:
        if isinstance(c.get('created_at'), str):
            c['created_at'] = datetime.fromisoformat(c['created_at'])
    return items

@api_router.post(
    "/worker-registration",
    response_model=WorkerRegistration,
    status_code=201
)
async def create_worker_registration(
    payload: WorkerRegistrationCreate
):
    worker = WorkerRegistration(
        **payload.model_dump()
    )

    doc = worker.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()

    await db.worker_registrations.insert_one(doc)

    logger.info(
        f"New worker registration from {worker.email}"
    )

    # Send email notification to owner
    if RESEND_API_KEY:
        try:
            html_body = f"""
            <div style="font-family: Arial, Helvetica, sans-serif; max-width:600px; margin:0 auto; color:#0A0A0A;">

              <div style="background:#0A0A0A; color:#ffffff; padding:24px 28px;">
                <div style="font-size:11px; letter-spacing:3px; color:#D4AF37; text-transform:uppercase;">
                  Sahuja Interiors
                </div>

                <h1 style="margin:8px 0 0; font-weight:300; font-size:26px;">
                  New Worker Registration
                </h1>
              </div>

              <div style="padding:28px; background:#FAFAFA; border:1px solid #EAEAEA; border-top:none;">

                <table style="width:100%; border-collapse:collapse;">

                  <tr>
                    <td style="padding:10px 0; color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px; width:130px;">
                      Name
                    </td>
                    <td style="padding:10px 0; font-size:15px;">
                      {worker.name}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 0; color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">
                      Email
                    </td>
                    <td style="padding:10px 0; font-size:15px;">
                      <a href="mailto:{worker.email}" style="color:#B8902B; text-decoration:none;">
                        {worker.email}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 0; color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">
                      Phone
                    </td>
                    <td style="padding:10px 0; font-size:15px;">
                      {worker.phone}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 0; color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">
                      Address
                    </td>
                    <td style="padding:10px 0; font-size:15px;">
                      {worker.address or '—'}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 0; color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">
                      Work Type
                    </td>
                    <td style="padding:10px 0; font-size:15px;">
                      {worker.work_type}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 0; color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">
                      Experience
                    </td>
                    <td style="padding:10px 0; font-size:15px;">
                      {worker.experience or '—'}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 0; color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px; vertical-align:top;">
                      Message
                    </td>
                    <td style="padding:10px 0; font-size:15px; line-height:1.6; white-space:pre-wrap;">
                      {worker.message or '—'}
                    </td>
                  </tr>

                </table>

                <p style="margin-top:28px; font-size:12px; color:#8E8E8E;">
                  Reply directly to this email to contact the worker.
                </p>

              </div>
            </div>
            """

            params = {
                "from": f"Sahuja Interiors <{SENDER_EMAIL}>",
                "to": [NOTIFICATION_EMAIL],
                "subject": f"New Worker Registration - {worker.name}",
                "html": html_body,
                "reply_to": worker.email,
            }

            await asyncio.to_thread(
                resend.Emails.send,
                params
            )

            logger.info(
                f"Worker registration email sent to {NOTIFICATION_EMAIL}"
            )

        except Exception as e:
            logger.error(
                f"Resend failed (worker registration saved): {e}"
            )

    else:
        logger.warning(
            "RESEND_API_KEY not set — skipping worker email notification"
        )

    return worker



# ---------- Auth ----------
@api_router.post("/auth/login", response_model=LoginOut)
async def admin_login(payload: LoginIn):
    email = payload.email.lower().strip()
    admin = await db.admin_users.find_one({"email": email}, {"_id": 0})
    if not admin or not verify_password(payload.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(email)
    return LoginOut(
        access_token=token,
        expires_in=JWT_EXPIRES_DAYS * 86400,
        email=email,
    )


@api_router.get("/auth/me")
async def admin_me(user=Depends(require_admin)):
    return {"email": user["sub"], "role": user["role"]}


# ---------- Works (owner-uploaded real project images) ----------
@api_router.get("/works", response_model=List[Work])
async def list_all_works():
    items = await db.works.find({}, {"_id": 0}).sort("created_at", -1).to_list(2000)
    for w in items:
        if isinstance(w.get('created_at'), str):
            w['created_at'] = datetime.fromisoformat(w['created_at'])
    return items


@api_router.get("/works/by-service/{slug}", response_model=List[Work])
async def list_works_by_service(slug: str):
    if slug not in SERVICE_SLUGS:
        raise HTTPException(status_code=404, detail="Unknown service")
    items = await db.works.find({"service_slug": slug}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for w in items:
        if isinstance(w.get('created_at'), str):
            w['created_at'] = datetime.fromisoformat(w['created_at'])
    return items


@api_router.post("/works", response_model=Work, status_code=201)
async def create_work(payload: WorkCreate, user=Depends(require_admin)):
    if payload.service_slug not in SERVICE_SLUGS:
        raise HTTPException(status_code=400, detail="Invalid service_slug")
    work = Work(
        id=str(uuid.uuid4()),
        service_slug=payload.service_slug,
        image_base64=payload.image_base64,
        caption=payload.caption,
        created_at=datetime.now(timezone.utc),
    )
    doc = work.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.works.insert_one(doc)
    return work


@api_router.delete("/works/{work_id}", status_code=204)
async def delete_work(work_id: str, user=Depends(require_admin)):
    result = await db.works.delete_one({"id": work_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Work not found")
    return None


# ---------- References (admin-uploaded portfolio reference images) ----------
@api_router.get("/references", response_model=List[Reference])
async def list_all_references():
    items = await db.references.find({}, {"_id": 0}).sort("created_at", -1).to_list(2000)
    for r in items:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return items


@api_router.get("/references/by-category/{slug}", response_model=List[Reference])
async def list_references_by_category(slug: str):
    if slug not in CATEGORY_SLUGS:
        raise HTTPException(status_code=404, detail="Unknown category")
    items = await db.references.find({"category_slug": slug}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for r in items:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return items


@api_router.post("/references", response_model=Reference, status_code=201)
async def create_reference(payload: ReferenceCreate, user=Depends(require_admin)):
    if payload.category_slug not in CATEGORY_SLUGS:
        raise HTTPException(status_code=400, detail="Invalid category_slug")
    ref = Reference(
        id=str(uuid.uuid4()),
        category_slug=payload.category_slug,
        image_base64=payload.image_base64,
        caption=payload.caption,
        created_at=datetime.now(timezone.utc),
    )
    doc = ref.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.references.insert_one(doc)
    return ref


@api_router.delete("/references/{ref_id}", status_code=204)
async def delete_reference(ref_id: str, user=Depends(require_admin)):
    result = await db.references.delete_one({"id": ref_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Reference not found")
    return None



# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
