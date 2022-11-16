import express from "express";

import {
  postBoard,
  getBoard,
  getBoardList,
  deleteBoard,
  patchBoard,
} from "../controllers/board";
import { loginCheck } from "../middlewares/auth";
import { validate, postBoardValidationRules } from "../middlewares/validate";

const router = express.Router();

router.use("/", loginCheck, postBoardValidationRules(), validate);
router.post("/", postBoard);

router.get("/list", loginCheck, getBoardList);
router.get("/:id", loginCheck, getBoard);
router.delete("/", loginCheck, deleteBoard);
router.patch("/", loginCheck, patchBoard);

export default router;
