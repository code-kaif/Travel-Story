import express from "express";
import { createUser, getUser, loginUser } from "../controllers/User.js";
import { isAuth } from "../utils/isAuthenticated.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/get", isAuth, getUser);
export default router;
