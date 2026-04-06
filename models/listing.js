const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description : String,
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://villaplanet.in/wp-content/uploads/2024/01/JPEG39-768x512.jpg",
            set: (v) => v === "" ?
            "https://villaplanet.in/wp-content/uploads/2024/01/JPEG39-768x512.jpg" 
            : v,
        }
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;