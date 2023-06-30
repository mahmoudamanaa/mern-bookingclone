import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  const { userId } = req.params;

  let updatedUser;
  try {
    updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    return next(err);
  }
};

export const getUser = async (req, res, next) => {
  const { userId } = req.params;

  let user;
  try {
    user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

export const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};
