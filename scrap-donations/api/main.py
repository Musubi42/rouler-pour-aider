import os
import re
from datetime import datetime, timedelta

import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware

app = FastAPI()

# Define a list of allowed origins
origins = [
    "http://localhost:3001", 
    "http://localhost:3000", 
    "https://rouler-pour-aider-git-staging-lmlc.vercel.app",
    "https://roulerpouraider.fr",  
    "https://www.roulerpouraider.fr"
]

# Add CORS middleware to allow requests from the specified origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow the origins defined in the list
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Allowed methods
    allow_headers=["Content-Type", "Authorization"],  # Allowed headers
)

URL = "https://solidarite.fondationaphp.fr/projects/rouler-pour-aider-fr"
CACHE_MINUTES = int(os.getenv("CACHE_MINUTES", 15))


def get_donations():
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")

    current_amount_html = soup.find(class_="current-amount")
    current_amount = re.findall(r"€\s*([\d,\.]+)", current_amount_html.text)
    current_amount = int(current_amount[0].replace(',', '').replace('.', ''))
    print(current_amount)
    # current_amount = round(current_amount / 100)

    # current_amount = re.findall(r"\d+", current_amount_html.text)[0]

    target_amount_html = soup.find(class_="objectif-amount")
    target_amount = re.findall(r"\d[\d\s,]*", target_amount_html.text)
    target_amount = re.sub(r"[\s,]", "", target_amount[0])

    contributors_count_html = soup.select_one(".contributeurs span")
    contributors_count = contributors_count_html.text

    return {
        "current_amount": int(current_amount),
        "target_amount": int(target_amount),
        "contributors_count": int(contributors_count),
    }


last_request = {"date": datetime.now(), "response": get_donations()}


@app.get("/donations")
def read_donations():
    now = datetime.now()

    if now - last_request["date"] > timedelta(minutes=CACHE_MINUTES):
        last_request["date"] = now
        last_request["response"] = get_donations()

    return last_request["response"]
