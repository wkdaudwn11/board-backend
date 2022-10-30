import express from "express";
import {
  postBoard,
  getBoard,
  getBoardList,
  deleteBoard,
  patchBoard,
} from "../controllers/board";

const router = express.Router();

router.post("/", postBoard);
router.get("/list", getBoardList);
router.get("/:id", getBoard);
router.delete("/", deleteBoard);
router.patch("/", patchBoard);

export default router;
