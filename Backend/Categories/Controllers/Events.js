import express from "express";
import Event from "../Models/EventCard.js";

const router = express.Router();

// ✅ Create Event
export const createEvent = async (req, res) => {
  try {
    const { title, imageUrl, shortDescription, longDescription, date, location, price } = req.body;

    if (!title || !imageUrl || !shortDescription || !longDescription || !date || !location || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEvent = new Event({
      title,
      imageUrl,
      shortDescription,
      longDescription,
      date,
      location,
      price,
      createdBy: req.user.uid, // ✅ Firebase UID from Token
      createdByEmail: req.user.email, // ✅ User Email from Token
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });

  } catch (error) {
    console.error("Create Event Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const allEvents =  async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

// ✅ Get Logged-in User's Events
export const yourEvents = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const userEvents = await Event.find({ createdBy: req.user.uid });
  res.json(userEvents);
};

// ✅ Edit Event (Only Creator)
export const editEvent = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  if (event.createdBy !== req.user.uid) return res.status(403).json({ message: "Unauthorized" });

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedEvent);
};

// ✅ Delete Event (Only Creator)
export const deleteEvent = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  if (event.createdBy !== req.user.uid) return res.status(403).json({ message: "Unauthorized" });

  await event.deleteOne();
  res.json({ message: "Event Deleted" });
};
