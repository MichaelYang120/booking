import express, {Request, Response} from "express";
import mongoose from "mongoose";
import {config} from "dotenv";
import cors from "cors";
config();
import Booking from "./models/Booking";
import {createEvents} from "./models/AddEvents"

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: "*",
}));



app.use(express.json());



app.post("/bookings", async (req: Request, res: Response) => {
    // console.log(req.body);
    const newBooking = new Booking({
        name: req.body.name,
        // events: [{
        //     eventName: req.body.events.eventName,
        // }]
    });
    // save
    const createdBooking = await newBooking.save();
    res.json(createdBooking); 
    console.log(res.json(createdBooking)); 
});

app.get("/bookings", async (req: Request, res: Response) => {
    const events = await Booking.find()
    res.json(events)
})

app.delete('/bookings/:eventId', async (req: Request, res: Response) => {
    const eventId = req.params.eventId;
    const event = await Booking.findByIdAndDelete(eventId);
    res.json(event)
})

app.post("/bookings/:bookingId/addevents", createEvents)

mongoose.connect(
    process.env.MONGO_URL !
    ).then(() => {
        console.log(`listening on port ${port}!`);
        app.listen(port)
    });