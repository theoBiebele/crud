import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/product.model.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();
const app = express();

//midddleware
app.use(express.json());

const D = process.env.D;
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello world from web dev class of backend developers");
});

app.post("/create-product", async (req, res) => {
  const productData = req.body;
  console.log("the product data =>", productData);
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product Created Successfully.",
      newProduct: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product Not Created.",
      error: error.message,
    });
  }
});
//routing
app.use("/products", productRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(D)
  .then(() => {
    console.log("Connected to DATABASE");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Not connected to DATABASE");
  });