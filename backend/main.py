from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import restaurants, hotels
from dotenv import load_dotenv
import os

load_dotenv()

origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(restaurants.router, prefix="/api")
app.include_router(hotels.router, prefix="/api")