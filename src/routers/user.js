import express from "express";
import { joinUser, loginUser } from "../controllers/user";

const router = express.Router();

router.post("/join", joinUser);
router.post("/login", loginUser);

export default router;
