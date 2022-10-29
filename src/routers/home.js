import express from "express";
import { home } from "../controllers/home";

const router = express.Router();

router.get("/", home);

export default router;
