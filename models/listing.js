const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: String,
    descriptios: String,
    image: String,
    price: Number,
    location: String,
    country: String

});

const Listing = mongoose.model("Listing", listingSchema);
modules.export = Listing;