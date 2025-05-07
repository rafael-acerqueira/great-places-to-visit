from fastapi import APIRouter
import datetime
from services.location import get_geo_id
from utils.sanitize_info import get_content_ids, get_relevant_info
import httpx
import os


router = APIRouter()

@router.get("/restaurants/{city}/content-ids")
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

    return get_content_ids(data)

@router.get("/restaurants/{content_id}")
async def get_restaurant_details(content_id):
    url = "https://travel-advisor.p.rapidapi.com/restaurants/v2/get-details"
    headers = {
        "X-RapidAPI-Key": os.getenv("RAPIDAPI_KEY"),
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    payload = {
        "contentId": content_id,
        "partySize": 2,
        "reservationTime": datetime.datetime.now().isoformat()
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)
        data = response.json()

    return get_relevant_info(data)