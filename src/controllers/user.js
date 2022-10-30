import User from "../models/user";

export const postUser = async (req, res) => {
  try {
    const { email, password, name, age } = req.body;

    const data = new User({
      email,
      password,
      name,
      age,
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = User.findOne({ email });

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
