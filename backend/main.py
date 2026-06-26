from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv
import os
import time
import json
import re
import urllib.request
import urllib.parse
import ollama
import traceback

# =====================
# LOAD ENV + SUPABASE
# =====================
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# =====================
# APP INIT
# =====================
app = FastAPI(title="RepurposeAI", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

STATIC_DIR = "static"
os.makedirs(STATIC_DIR, exist_ok=True)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


# =====================
# MODELS
# =====================
class TranscribeRequest(BaseModel):
    file_id: str

class GenerateRequest(BaseModel):
    transcript: str
    video_title: str = "Untitled"

class UserRequest(BaseModel):
    username: str
    email: str
    password: str
    niche: str = ""

class LoginRequest(BaseModel):
    email: str
    password: str


# =====================
# HELPERS
# =====================
def get_youtube_title(url: str) -> str:
    try:
        oembed_url = f"https://www.youtube.com/oembed?url={urllib.parse.quote(url)}&format=json"
        req = urllib.request.Request(oembed_url)
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode())
            return data.get("title", "")
    except:
        return ""


# =====================
# ROUTES
# =====================

@app.get("/")
def home():
    return {"status": "ok", "msg": "Supabase backend running"}


# ---------------------
# AUTH
# ---------------------
@app.post("/register")
def register_user(req: UserRequest):
    existing = supabase.table("users").select("*").eq("email", req.email).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Email already registered")

    result = supabase.table("users").insert({
        "username": req.username,
        "email": req.email,
        "password": req.password,
        "niche": req.niche
    }).execute()

    return {"status": "created", "user": result.data[0]}


@app.post("/login")
def login_user(req: LoginRequest):
    result = supabase.table("users").select("*").eq("email", req.email).eq("password", req.password).execute()
    if not result.data:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"status": "success", "user": result.data[0]}


# ---------------------
# UPLOAD
# ---------------------
@app.post("/upload")
async def upload(request: Request):
    form = await request.form()
    youtube_url = form.get("youtube_url")
    file = form.get("file")
    file_id = f"file_{int(time.time())}"

    if youtube_url:
        title = get_youtube_title(str(youtube_url))
        supabase.table("videos").insert({
            "id": file_id,
            "title": title,
            "source": str(youtube_url),
            "transcript": None
        }).execute()
        return {"status": "success", "file_id": file_id, "title": title}

    if file:
        filename = file.filename
        supabase.table("videos").insert({
            "id": file_id,
            "title": filename,
            "source": "upload",
            "transcript": None
        }).execute()
        return {"status": "success", "file_id": file_id, "title": filename}

    raise HTTPException(status_code=400, detail="No input provided")


# ---------------------
# TRANSCRIBE (MOCK)
# ---------------------
@app.post("/transcribe")
def transcribe(req: TranscribeRequest):
    file_data = supabase.table("videos").select("*").eq("id", req.file_id).execute()

    if not file_data.data:
        raise HTTPException(status_code=404, detail="File not found")

    title = file_data.data[0]["title"]
    
    # Clean the title (e.g. remove file extensions and replace underscores/hyphens)
    clean_title = title
    for ext in ['.mp4', '.mp3', '.wav', '.mov', '.avi', '.m4a']:
        if clean_title.lower().endswith(ext):
            clean_title = clean_title[:-len(ext)]
    clean_title = clean_title.replace('_', ' ').replace('-', ' ').strip()

    # Generate a realistic, topic-specific transcript using Ollama
    transcript = f"In this video '{title}', we discuss AI, startups and productivity." # Fallback
    try:
        ollama_prompt = f"""
You are an expert video transcriber.
Create a realistic, detailed, high-quality monologue transcript of a video with the title: "{clean_title}".
The transcript should be a first-person spoken monologue, natural, detailed, and directly about the topic of the title.
Do NOT include any speaker labels (like "Speaker 1:") or timestamps. Do NOT include any intro or outro commentary like "Here is the transcript:". Just return the raw transcript text.
"""
        response = ollama.chat(
            model="llama3.2",
            messages=[{"role": "user", "content": ollama_prompt}]
        )
        model_transcript = response["message"]["content"].strip()
        if model_transcript:
            transcript = model_transcript
    except Exception as e:
        traceback.print_exc()
        print(f"Error calling Ollama in transcribe: {e}")

    supabase.table("videos").update({
        "transcript": transcript
    }).eq("id", req.file_id).execute()

    return {"status": "success", "transcript": transcript}


# ---------------------
# GENERATE CONTENT (OLLAMA)
# ---------------------
@app.post("/generate-content")
def generate(req: GenerateRequest):

    prompt = f"""
You are a social media content expert.
Based on this video transcript, generate content for multiple platforms.

Transcript: {req.transcript}

Return ONLY a valid JSON object with these exact keys, no extra text:
{{
  "linkedin": "A professional post text block summarizing the key points of the content with appropriate formatting and 2-3 hashtags.",
  "twitter_thread": "A string containing a Twitter/X thread. Start with a hook and list the tweets separated by double newlines. E.g., '🧵 tweet 1\\n\\n1️⃣ tweet 2\\n\\n2️⃣ tweet 3'",
  "instagram": "A catchy, engaging Instagram caption with emojis and relevant hashtags.",
  "newsletter": "An engaging email newsletter draft that summarizes the major lessons, insights, or takeaways from the video with bullet points and a friendly tone.",
  "hooks": [
    "Hook 1: A viral scroll-stopping hook statement.",
    "Hook 2: Another viral scroll-stopping hook statement.",
    "Hook 3: Hook statement.",
    "Hook 4: Hook statement.",
    "Hook 5: Hook statement."
  ],
  "calendar": [
    {{"day": "Monday", "platform": "LinkedIn"}},
    {{"day": "Tuesday", "platform": "Instagram"}},
    {{"day": "Wednesday", "platform": "X Thread"}},
    {{"day": "Thursday", "platform": "Reel"}},
    {{"day": "Friday", "platform": "Newsletter"}}
  ]
}}
"""

    try:
        response = ollama.chat(
            model="llama3.2",
            messages=[{"role": "user", "content": prompt}]
        )
        raw = response["message"]["content"]

        # JSON extract karo
        json_match = re.search(r'\{.*\}', raw, re.DOTALL)
        if not json_match:
            raise ValueError("No JSON found")

        result = json.loads(json_match.group())

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Ollama error: {str(e)}")

    # Ensure all required keys exist using defaults to prevent KeyError
    result.setdefault("linkedin", "")
    result.setdefault("twitter_thread", "")
    result.setdefault("instagram", "")
    result.setdefault("newsletter", "")
    result.setdefault("hooks", [])
    result.setdefault("calendar", [
        {"day": "Monday", "platform": "LinkedIn"},
        {"day": "Tuesday", "platform": "Instagram"},
        {"day": "Wednesday", "platform": "X Thread"},
        {"day": "Thursday", "platform": "Reel"},
        {"day": "Friday", "platform": "Newsletter"}
    ])

    # Supabase mein save
    supabase.table("content_outputs").insert({
        "video_title": req.video_title,
        "linkedin": result["linkedin"],
        "twitter_thread": result["twitter_thread"],
        "instagram": result["instagram"],
        "newsletter": result["newsletter"],
        "hooks": result["hooks"],
        "calendar": result["calendar"]
    }).execute()

    return result


# ---------------------
# HISTORY
# ---------------------
@app.get("/history")
def get_history():
    result = supabase.table("content_outputs").select("*").execute()
    return {"history": result.data}