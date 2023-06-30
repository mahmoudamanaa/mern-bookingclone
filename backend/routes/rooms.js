import express from "express";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoomAvailability,
} from "../controllers/rooms.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// /api/rooms

// Create new room
router.post("/:hotelId", verifyAdmin, createRoom);

// Update existing room
router.put("/:roomId", verifyAdmin, updateRoom);

router.put("/availability/:roomId", updateRoomAvailability);

// Delete existing room
router.delete("/:roomId/:hotelId", verifyAdmin, deleteRoom);

// Get a specific room
router.get("/:roomId", getRoom);

// Get all rooms
router.get("/", getRooms);

export default router;
