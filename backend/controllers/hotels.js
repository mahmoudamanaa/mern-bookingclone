import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  let newHotel = new Hotel(req.body);
  try {
    newHotel = await newHotel.save();
    res.status(200).json(newHotel);
  } catch (err) {
    return next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  const { hotelId } = req.params;

  let updatedHotel;
  try {
    updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    return next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  const { hotelId } = req.params;

  try {
    await Hotel.findByIdAndDelete(hotelId);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    return next(err);
  }
};

export const getHotel = async (req, res, next) => {
  const { hotelId } = req.params;

  let hotel;
  try {
    hotel = await Hotel.findById(hotelId);
    res.status(200).json(hotel);
  } catch (err) {
    return next(err);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;

  let hotels;
  try {
    hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(limit);
    res.status(200).json(hotels);
  } catch (err) {
    return next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  let list;
  try {
    list = await Promise.all(
      cities.map((city) => Hotel.countDocuments({ city }))
    );
    res.status(200).json(list);
  } catch (err) {
    return next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    return next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );

    res.status(200).json(list);
  } catch (err) {
    return next(err);
  }
};
