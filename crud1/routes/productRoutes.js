
import express from "express"
import { allProducts, createProduct, deletedProduct, getProduct, updatedProduct } from "../controllers/productControllers.js";

const router = express.Router();

router.get("/all-products", allProducts);
router.get("/:id", getProduct)
router.get("/update/:id", updatedProduct)
router.get("/delete/:id", deletedProduct)
router.post("/create-products", createProduct)

export default router;



