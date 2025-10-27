from fastapi import FastAPI, Cookie, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json

app = FastAPI(title="Cookie & Session Step1", version="1.0.0")

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.jsのデフォルトポート
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CartItem(BaseModel):
    id: int
    quantity: int


class Product(BaseModel):
    id: int
    name: str
    price: float


# Cookie操作用のヘルパー関数
def parse_cart_cookie(cart_cookie: Optional[str]) -> List[CartItem]:
    """Cookieからカート情報をパース"""
    if not cart_cookie:
        return []
    try:
        cart_data = json.loads(cart_cookie)
        return [CartItem(**item) for item in cart_data]
    except (json.JSONDecodeError, ValueError):
        return []


def serialize_cart_cookie(cart_items: List[CartItem]) -> str:
    """カート情報をCookie用の文字列にシリアライズ"""
    return json.dumps([item.dict() for item in cart_items])


def set_cart_cookie(response: Response, cart_items: List[CartItem]):
    """ResponseにカートCookieを設定"""
    cart_cookie = serialize_cart_cookie(cart_items)
    response.set_cookie(key="cart", value=cart_cookie, httponly=True, max_age=86400, samesite="lax")  # 24時間


# APIエンドポイント
@app.get("/api/step1/products")
async def get_products():
    """商品一覧を取得"""
    products = [
        {"id": 1, "name": "りんご", "price": 500},
        {"id": 2, "name": "バナナ", "price": 300},
        {"id": 3, "name": "オレンジ", "price": 100},
        {"id": 4, "name": "グレープ", "price": 1000},
        {"id": 5, "name": "パイナップル", "price": 1500},
        {"id": 6, "name": "メロン", "price": 3000},
    ]
    return {"products": products}


@app.get("/api/step1/items")
async def get_cart_items(cart: Optional[str] = Cookie(None)):
    """カート内の情報を取得"""
    cart_items = parse_cart_cookie(cart)
    return {"cart": [item.dict() for item in cart_items]}


@app.post("/api/step1/items")
async def add_to_cart(product: Product, response: Response, cart: Optional[str] = Cookie(None)):
    """商品をカートに追加"""
    cart_items = parse_cart_cookie(cart)

    # 既存の商品があるかチェック
    existing_item = next((item for item in cart_items if item.id == product.id), None)

    if existing_item:
        # 既存商品の個数を+1
        existing_item.quantity += 1
    else:
        # 新しい商品を追加
        cart_items.append(CartItem(id=product.id, quantity=1))

    # Cookieを更新
    set_cart_cookie(response, cart_items)

    return {"cart": [item.dict() for item in cart_items]}


@app.delete("/api/step1/items/{item_id}")
async def remove_from_cart(item_id: int, response: Response, cart: Optional[str] = Cookie(None)):
    """商品をカートから削除"""
    cart_items = parse_cart_cookie(cart)

    # 指定された商品を削除
    cart_items = [item for item in cart_items if item.id != item_id]

    # Cookieを更新
    set_cart_cookie(response, cart_items)

    return {"cart": [item.dict() for item in cart_items]}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
