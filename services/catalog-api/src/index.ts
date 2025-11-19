// src/index.ts
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/acme";

const app = express();

// ✅ Enable JSON body parsing and CORS for the frontend
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🩺 Health endpoint
app.get("/health", (_req, res) => res.json({ ok: true, service: "catalog-api" }));

// 🛍 Product model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});
const Product = mongoose.model("Product", productSchema);

// 🧾 Routes
app.get("/products", async (_req, res) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (err) {
    console.error("GET /products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const created = await Product.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error("POST /products error:", err);
    res.status(400).json({ error: "Failed to create product" });
  }
});

// 🚀 Start server after connecting to MongoDB
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 catalog-api on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();

