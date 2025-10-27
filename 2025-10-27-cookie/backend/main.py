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
    content = "[]" if cart is None else cart
    response = JSONResponse(content=content)
    return response


@app.post("/api/step1/items")
def add_item(id: AddItemId, cart: Union[str, None] = Cookie(None)):
    if cart is None:
        # INFO 初アクセス時
        response = JSONResponse(content={"cart": "[]"})
        response.set_cookie(key="cart", value="[]")
        return response

    cur_cart: list[dict] = json.loads(cart)
    id_found = False
    for i, item in enumerate(cur_cart):
        if item.get("id") == id:
            cur_cart[i].quantity += 1
            id_found = True
    if not id_found:
        cur_cart.append({"id": id, "quantity": 1})

    cart_data = json.dumps(cur_cart)
    response = JSONResponse(content={"cart": cart_data})
    response.set_cookie(key="cart", value=cart_data)
    return response


@app.delete("/api/step1/items/{itemId}")
def delete_item(itemId, cart: Union[str, None] = Cookie(default=None)):
    if cart is None:
        response = JSONResponse(content="[]")
        response.set_cookie(key="cart", value="[]")
        return response

    cur_cart = json.loads(cart)
    for i, item in enumerate(cur_cart):
        if item.get("id") == itemId:
            del cur_cart[i]

    content = json.dumps(cur_cart)
    response = JSONResponse(content=content)
    response.set_cookie(key="cart", value=content, max_age=0)
    return response
