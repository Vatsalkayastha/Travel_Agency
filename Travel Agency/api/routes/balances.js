import express from "express";
import { login, register } from "../controllers/auth.js";
import { getCount } from "../controllers/balance.js";

const router = express.Router();

router.get("/countobject/no", getCount);

export default router
