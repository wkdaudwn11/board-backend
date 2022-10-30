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
      success: true,
      message: null,
      data,
    });
  } catch {
    res.status(200).json({
      success: false,
      message: "Error",
      data: null,
    });
  }
};

export const getBoardList = async (req, res) => {
  try {
    const { page, limit } = req.body;

    const list = await BoardSchema.find()
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: null,
      data: list,
    });
  } catch {
    res.status(200).json({
      success: false,
      message: "Error",
      data: null,
    });
  }
};

export const getBoard = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await BoardSchema.findById({ _id: id });

    res.status(200).json({
      success: true,
      message: null,
      data,
    });
  } catch {
    res.status(200).json({
      success: false,
      message: "Error",
      data: null,
    });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const { id } = req.body;

    await BoardSchema.findByIdAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: null,
      data: null,
    });
  } catch {
    res.status(200).json({
      success: false,
      message: "Error",
      data: null,
    });
  }
};

export const patchBoard = async (req, res) => {
  try {
    const { id, writer, title, content } = req.body;

    const data = await BoardSchema.findByIdAndUpdate(
      { _id: id },
      {
        writer,
        title,
        content,
      }
    );

    res.status(200).json({
      success: true,
      message: null,
      data,
    });
  } catch {
    res.status(200).json({
      success: false,
      message: "Error",
      data: null,
    });
  }
};
