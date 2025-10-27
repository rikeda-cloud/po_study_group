from fastapi import FastAPI

app = FastAPI()


@app.get("/api/step1/items")
def list_items():
    return {"Hello": "World"}


@app.post("/api/step1/items")
def add_item():
    return {"Hello": "World"}


@app.delete("/api/step1/items/{itemId}")
def delete_item():
    return {"Hello": "World"}
