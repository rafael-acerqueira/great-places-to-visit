from fastapi import APIRouter
import datetime
from services.location import get_geo_id
from utils.sanitize_info import get_content_ids, get_relevant_info
import httpx
import os


router = APIRouter()

@router.get("/hotels/{city}/content-ids")
async def get_hotels(city: str):
    geo_id = await get_geo_id(city)
    url = "https://travel-advisor.p.rapidapi.com/hotels/v2/list"
    headers = {
        "X-RapidAPI-Key": os.getenv("RAPIDAPI_KEY"),
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    payload = {
        "geoId": geo_id,
        "sort": "PRICE_LOW_TO_HIGH",
        "sortOrder": "asc"
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)
        data = response.json()

    return get_content_ids(data)



@router.get("/hotels/{content_id}")
async def get_hotel_details(content_id):
    url = "https://travel-advisor.p.rapidapi.com/hotels/v2/get-details"
    headers = {
        "X-RapidAPI-Key": os.getenv("RAPIDAPI_KEY"),
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    payload = {
        "contentId": content_id,
        "checkIn": datetime.datetime.now().isoformat(),
        "checkOut": (datetime.date.today() + datetime.timedelta(days=2)).isoformat(),
        "rooms": [
            {
                "adults": 2,
                "childrenAges": [
                    2
                ]
            }
        ]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)
        data = response.json()

    return get_relevant_info(data)