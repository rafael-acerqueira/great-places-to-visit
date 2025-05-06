from fastapi import APIRouter
from services.location import get_geo_id
import httpx
import os


router = APIRouter()

@router.get("/restaurants/{city}")
async def get_restaurants(city: str):
    geo_id = await get_geo_id(city)
    url = "https://travel-advisor.p.rapidapi.com/restaurants/v2/list"
    headers = {
        "X-RapidAPI-Key": os.getenv("RAPIDAPI_KEY"),
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    payload = {
        "geoId": geo_id,
        "sort": "POPULARITY",
        "sortOrder": "desc"
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)
        data = response.json()

    return data