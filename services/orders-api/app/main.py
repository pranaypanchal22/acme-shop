from fastapi import FastAPI
app = FastAPI()

@app.get("/health")
def health():
    return {"ok": True, "service": "orders-api"}

@app.get("/orders")
def list_orders():
    return [{"id": 1, "status": "NEW"}]
