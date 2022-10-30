import Board from "../models/board";

export const postBoard = async (req, res) => {
  try {
    const { writer, title, content } = req.body;

    const data = new Board({
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
  } catch (e) {
    res.status(200).json({
      success: false,
      message: e.message,
      data: null,
    });
  }
};

export const getBoardList = async (req, res) => {
  try {
    const { page, limit } = req.body;

    const list = await Board.find()
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: null,
      data: list,
    });
  } catch (e) {
    res.status(200).json({
      success: false,
      message: e.message,
      data: null,
    });
  }
};

export const getBoard = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Board.findById({ _id: id });

    res.status(200).json({
      success: true,
      message: null,
      data,
    });
  } catch (e) {
    res.status(200).json({
      success: false,
      message: e.message,
      data: null,
    });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const { id } = req.body;

    await Board.findByIdAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: null,
      data: null,
    });
  } catch (e) {
    res.status(200).json({
      success: false,
      message: e.message,
      data: null,
    });
  }
};

export const patchBoard = async (req, res) => {
  try {
    const { id, writer, title, content } = req.body;

    const data = await Board.findByIdAndUpdate(
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
  } catch (e) {
    res.status(200).json({
      success: false,
      message: e.message,
      data: null,
    });
  }
};
