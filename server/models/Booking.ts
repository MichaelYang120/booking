import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    name: String,
    events: [String],
})

const BookingModel = mongoose.model('Bookings', BookingSchema);

export default BookingModel;