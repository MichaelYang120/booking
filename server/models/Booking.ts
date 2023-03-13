import mongoose from "mongoose";

// we are using this schema to update our db, and adding an array of objects and appending it to events, this array will contain data such as eventName, eventDate, eventStartTime, ect...

const Schema = mongoose.Schema;

// default data strucuture
// {
//     "name": "testing"
//     "events": {
//         "eventName": "test",
//         "eventDate": "testing"
//     }
// }

const BookingSchema = new Schema({
    name: String,
    events: Array,
})

const BookingModel = mongoose.model('Bookings', BookingSchema);

export default BookingModel;