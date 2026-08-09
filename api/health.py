"""Vercel Python Function — GET /api/health

Registered under both /health and /api/health: Vercel forwards the full
original request path (so /api/health, matching this file's location
under api/), but local tools (uvicorn run directly against this module)
hit it at whatever bare path you choose — covering both avoids re-finding
this the same way api/ai/chat.py's routing did.
"""
from fastapi import FastAPI

app = FastAPI()


@app.get("/api/health")
@app.get("/health")
def health():
    return {"status": "ok"}
