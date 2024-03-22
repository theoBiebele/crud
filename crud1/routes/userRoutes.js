import express from "express"
import { register } from "../controllers/userControllers.js";
import { login } from "../controllers/userControllers.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/login");
export default router;