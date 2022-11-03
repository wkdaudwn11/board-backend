import express from "express";

import {
  postBoard,
  getBoard,
  getBoardList,
  deleteBoard,
  patchBoard,
} from "../controllers/board";
import { loginCheck } from "../middlewares/auth";

const router = express.Router();

router.post("/", loginCheck, postBoard);
router.get("/list", loginCheck, getBoardList);
router.get("/:id", loginCheck, getBoard);
router.delete("/", loginCheck, deleteBoard);
router.patch("/", loginCheck, patchBoard);

export default router;
