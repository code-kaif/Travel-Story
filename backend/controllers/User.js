import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(401)
      .json({ message: "User Already Exist", success: false });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User({ name, email, password: hashPassword });
  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      user: {
        name: newUser.name,
        email: newUser.email,
        token,
      },
      message: "User Created Successfully",
    });
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid Email", success: false });
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res
      .status(401)
      .json({ message: "Invalid Password", success: false });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      user: {
        email,
        token,
      },
      message: "Login Successfully",
    });
};

export const getUser = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  res.status(200).json({
    user: {
      name: user.name,
      email: user.email,
    },
    success: true,
  });
};
