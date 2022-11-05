import jwt from "jsonwebtoken";

import User from "../models/user";
import { createHashedPassword, verifyPassword } from "../lib/auth";

export const joinUser = async (req, res) => {
  try {
    const { email, password, name, age } = req.body;
    const checkEmail = await User.findOne({ email });

    if (email) throw new Error("email already exists");

    const { hashedPassword, salt } = await createHashedPassword(password);
    const data = new User({
      email,
      password: hashedPassword,
      salt,
      name,
      age,
    });

    await data.save();

    res.status(200).json({
      success: true,
      message: null,
      data: {
        email: data.email,
        name: data.name,
        age: data.age,
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

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found.");

    const verified = await verifyPassword(password, user.salt, user.password);

    if (!verified) throw new Error("Password does not match.");

    const payload = {
      email: user.email,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: null,
      data: {
        accessToken,
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
