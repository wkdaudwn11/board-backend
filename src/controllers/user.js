import User from "../models/user";
import { createHashedPassword } from "../lib/auth";

export const postUser = async (req, res) => {
  try {
    const { email, password, name, age } = req.body;
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
