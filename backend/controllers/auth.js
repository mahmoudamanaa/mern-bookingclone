import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  let newUser;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    newUser = new User({ ...req.body, password: hashedPassword });
    newUser = await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    return next(err);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  let fetchedUser;
  try {
    fetchedUser = await User.findOne({ username });
    if (!fetchedUser) {
      return next(createError(404, "User not found."));
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      fetchedUser.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Password is incorrect."));
    }

    const token = jwt.sign(
      {
        userId: fetchedUser._id,
        isAdmin: fetchedUser.isAdmin,
      },
      process.env.JWT
    );

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      _id: fetchedUser._id,
      username: fetchedUser.username,
      email: fetchedUser.email,
      isAdmin: fetchedUser.isAdmin,
      createdAt: fetchedUser.createdAt,
      updatedAt: fetchedUser.updatedAt,
    });
  } catch (err) {
    return next(err);
  }
};
