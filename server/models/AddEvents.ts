import { Request, Response } from "express";
import Bookings from "./Booking";

// this is adding events data to the api using a post request, 
// server/models/Booking.ts this is the directory of the function we are using to execute
export async function createEvents (req: Request, res: Response) {
   const bookingId = req.params.bookingId;
   const booking = await Bookings.findById(bookingId);
   const { events } = req.body;
   if (!booking) return res.status(400).send("no booking id exisits");
   booking.events.push(events);
   console.log("this is the req body: " + req.body);
   await booking.save();
   res.json(booking);
}
