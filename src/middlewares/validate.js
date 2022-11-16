import { body, validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({
      success: false,
      message: errors.array(),
      data: null,
    });
  }
  next();
};

export const postBoardValidationRules = () => {
  return [
    body("title")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Enter 2 to 50 characters for the title"),
    body("content")
      .trim()
      .isLength({ min: 2, max: 300 })
      .withMessage("Enter 2 to 300 characters for the content"),
  ];
};
