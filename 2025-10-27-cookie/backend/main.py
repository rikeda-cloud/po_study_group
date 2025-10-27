from typing import Union
from fastapi import FastAPI, Cookie
from fastapi.responses import JSONResponse
import json
from pydantic import BaseModel


class AddItemId(BaseModel):
    id: int


app = FastAPI()


@app.get("/api/step1/items")
def list_items(cart: Union[str, None] = Cookie(default=None)):
    content = [] if cart is None else json.loads(cart)
    response = JSONResponse(content=content)
    return response


@app.post("/api/step1/items")
def add_item(add_item_id: AddItemId, cart: Union[str, None] = Cookie(None)):
    if cart is None:
        cur_cart = []
    else:
        cur_cart: list[dict] = json.loads(cart)

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
    if cart is None:
        cur_cart = []
    else:
        cur_cart = json.loads(cart)

    for i, item in enumerate(cur_cart):
        if item.get("id") == itemId:
            del cur_cart[i]
            break

    content = json.dumps(cur_cart)
    response = JSONResponse(content=cur_cart)
    response.set_cookie(key="cart", value=content)
    return response
