import express from "express";
import { postUser } from "../controllers/user";

const router = express.Router();

router.post("/", postUser);

export default router;
