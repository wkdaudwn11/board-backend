import Board from "../models/board";
import User from "../models/user";

export const postBoard = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { user } = res.locals;

    const data = new Board({
      userId: user._id,
      writer: user.name,
      email: user.email,
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
    const { user } = res.locals;
    const data = await Board.findById({ _id: id });
    const isMyBoard = user._id.toString() === data.userId.toString();

    res.status(200).json({
      success: true,
      message: null,
      data: {
        ...data._doc,
        isMyBoard,
      },
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
    const { user } = res.locals;
    const findBoard = await Board.findById({ _id: id });

    if (!findBoard) throw new Error("Board not found");

    if (user._id.toString() !== findBoard.userId.toString())
      throw new Error("Invalid user");

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
    const { user } = res.locals;
    const findBoard = await Board.findById({ _id: id });

    if (!findBoard) throw new Error("Board not found");

    if (user._id.toString() !== findBoard.userId.toString())
      throw new Error("Invalid user");

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
