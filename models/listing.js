const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    descriptios: String,
    image:{
        default: "https://unsplash.com/photos/mountains-stand-out-against-a-colorful-sunset-pzbm-wp8fa0",
        type: String,
        set: (v) => v === "" ? "https://unsplash.com/photos/mountains-stand-out-against-a-colorful-sunset-pzbm-wp8fa0" : v,
    },
    price: Number,
    location: String,
    country: String

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;