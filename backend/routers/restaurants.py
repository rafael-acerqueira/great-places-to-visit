import asyncio
from aiocache import cached, Cache
from aiolimiter import AsyncLimiter
from http.client import HTTPException

from fastapi import APIRouter
import datetime
from services.location import get_geo_id
from utils.sanitize_info import get_content_ids, get_relevant_info
import httpx
import os

router = APIRouter()

limiter = AsyncLimiter(max_rate=5, time_period=1)

semaphore = asyncio.Semaphore(5)

async def fetch_content_ids(city: str):
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

@cached(ttl=600, cache=Cache.MEMORY, key_builder=lambda f, *args, **kwargs: f"restaurant:{args[0]}")
async def fetch_restaurant_details(content_id):
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
        try:
            response = await client.post(url, headers=headers, json=payload)
            data = response.json()
            return get_relevant_info(data)
        except httpx.HTTPError as e:
            return {"content_id": content_id, "error": str(e)}

async def fetch_restaurant_details_with_control(content_id: str):
    async with semaphore:
        return await fetch_restaurant_details(content_id)

@router.get("/restaurants/{city}")
async def get_restaurants(city: str):
    content_ids = await fetch_content_ids(city)

    if not content_ids:
        raise HTTPException(status_code=404, detail="No restaurant found")

    tasks = [fetch_restaurant_details_with_control(content_id) for content_id in content_ids]
    restaurants = await asyncio.gather(*tasks)
    return restaurants