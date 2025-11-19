from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class OrderRequest(BaseModel):
    productId: str
    quantity: int

@app.get("/health")
def health():
    return {"ok": True, "service": "orders-api"}

@app.get("/orders")
def list_orders():
    return [{"id": 1, "status": "NEW"}]

@app.post("/orders")
def create_order(order: OrderRequest):
    # Simple mock order creation
    return {
        "id": 2,
        "productId": order.productId,
        "quantity": order.quantity,
        "status": "CREATED"
    }

