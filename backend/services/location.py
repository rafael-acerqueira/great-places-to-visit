from fastapi import APIRouter
import httpx
import os

router = APIRouter()

@router.get("/current-location")
async def get_geo_id(query: str):
    url = "https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete"
    headers = {
        "X-RapidAPI-Key": os.getenv("RAPIDAPI_KEY"),
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com"
    }

    params = {"query": query, "lang": "en_US", "units": "km"}

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=params)
        data = response.json()
        geo_id = (
            data.get("data", {})
            .get("Typeahead_autocomplete", {})
            .get("results", [{}])[0]
            .get("detailsV2", {})
            .get("route", {})
            .get("typedParams", {})
            .get("geoId")
        )

    return geo_id