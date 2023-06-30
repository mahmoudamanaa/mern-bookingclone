import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/users.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// /api/users

// Update existing user
router.put("/:userId", verifyUser, updateUser);

// Delete existing user
router.delete("/:userId", verifyUser, deleteUser);

// Get a specific user
router.get("/:userId", verifyUser, getUser);

// Get all users
router.get("/", verifyAdmin, getUsers);

export default router;
