from typing import Union
from fastapi import FastAPI, Cookie
from fastapi.responses import JSONResponse
import json
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


class AddItemId(BaseModel):
    id: int


app = FastAPI()


origins = [
    "http://localhost:3000",  # Frontend origin
    "http://localhost:8000",  # Backend origin (if needed for testing)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/step1/items")
def list_items(cart: Union[str, None] = Cookie(default=None)):
    content = []
    if cart:
        try:
            content = json.loads(cart)
        except json.JSONDecodeError:
            content = []
    response = JSONResponse(content=content)
    return response


@app.post("/api/step1/items")
def add_item(add_item_id: AddItemId, cart: Union[str, None] = Cookie(default=None)):
    cur_cart = []
    if cart:
        try:
            cur_cart = json.loads(cart)
        except json.JSONDecodeError:
            cur_cart = []

    id_found = False
    for i, item in enumerate(cur_cart):
        if item.get("id") == add_item_id.id:
            cur_cart[i]["quantity"] += 1
            id_found = True
            break
    if not id_found:
        cur_cart.append({"id": add_item_id.id, "quantity": 1})

    cart_data = json.dumps(cur_cart)
    response = JSONResponse(content=cur_cart)
    response.set_cookie(key="cart", value=cart_data)
    return response


@app.delete("/api/step1/items/{itemId}")
def delete_item(itemId: int, cart: Union[str, None] = Cookie(default=None)):
    cur_cart = []
    if cart:
        try:
            cur_cart = json.loads(cart)
        except json.JSONDecodeError:
            cur_cart = []

    for i, item in enumerate(cur_cart):
        if item.get("id") == itemId:
            del cur_cart[i]
            break

    content = json.dumps(cur_cart)
    response = JSONResponse(content=cur_cart)
    response.set_cookie(key="cart", value=content)
    return response
