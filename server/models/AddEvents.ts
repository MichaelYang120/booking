import { Request, Response } from "express";
import Bookings from "./Booking";

export async function createEvents (req: Request, res: Response) {
   const bookingId = req.params.bookingId;
   const booking = await Bookings.findById(bookingId);
   const { text } = req.body;
   if (!booking) return res.status(400).send("no booking id exisits");
   booking.events.push(text);
   await booking.save();
   res.json(booking);
}