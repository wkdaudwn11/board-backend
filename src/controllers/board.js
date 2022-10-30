import BoardSchema from "../models/board";

export const postBoard = async (req, res) => {
  try {
    const { writer, title, content } = req.body;

    const data = new BoardSchema({
      writer,
      title,
      content,
    });

    await data.save();

    res.status(200).json({
      code: "0000",
      message: null,
      data,
    });
  } catch {
    res.status(200).json({
      code: "1000",
      message: "Error",
      data: null,
    });
  }
};
