import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  const { hotelId } = req.params;

  let newRoom = new Room(req.body);
  try {
    newRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: newRoom._id } });
    } catch (err) {
      return next(err);
    }

    res.status(200).json(newRoom);
  } catch (err) {
    return next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  const { roomId } = req.params;

  let updatedRoom;
  try {
    updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    return next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const { roomId, hotelId } = req.params;

  try {
    await Room.findByIdAndDelete(roomId);

    try {
      await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } });
    } catch (err) {
      return next(err);
    }

    res.status(200).json("Room has been deleted.");
  } catch (err) {
    return next(err);
  }
};

export const getRoom = async (req, res, next) => {
  const { roomId } = req.params;

  let room;
  try {
    room = await Room.findById(roomId);
    res.status(200).json(room);
  } catch (err) {
    return next(err);
  }
};

export const getRooms = async (req, res, next) => {
  let rooms;
  try {
    rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    return next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  const { roomId } = req.params;

  try {
    await Room.updateOne(
      { "roomNumbers._id": roomId },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    );

    res.status(200).json(updatedRoom);
  } catch (err) {
    return next(err);
  }
};
