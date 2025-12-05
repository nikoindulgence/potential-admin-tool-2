from fastapi import APIRouter
from app.core.config import get_settings

router = APIRouter()


@router.get("")
async def health_check():
    return {"status": "ok", "message": "API is running"}


@router.get("/debug")
async def debug_check():
    settings = get_settings()
    return {
        "supabase_url_set": bool(settings.supabase_url),
        "supabase_key_set": bool(settings.supabase_service_role_key),
        "clerk_secret_set": bool(settings.clerk_secret_key),
        "clerk_issuer_set": bool(settings.clerk_jwt_issuer),
        "clerk_issuer_value": settings.clerk_jwt_issuer[:20] + "..." if settings.clerk_jwt_issuer else "NOT SET",
    }

