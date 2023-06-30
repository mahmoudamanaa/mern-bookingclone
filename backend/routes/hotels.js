import express from "express";
import {
  createHotel,
  deleteHotel,
  updateHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/hotels.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// /api/hotels

// Create new hotel
router.post("/", verifyAdmin, createHotel);

// Update existing hotel
router.put("/:hotelId", verifyAdmin, updateHotel);

// Delete existing hotel
router.delete("/:hotelId", verifyAdmin, deleteHotel);

// Get a specific hotel
router.get("/find/:hotelId", getHotel);

// Get all hotels
router.get("/", getHotels);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/room/:hotelId", getHotelRooms);

export default router;
