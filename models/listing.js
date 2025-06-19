const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
    filename: String,
    url: String,
     default: "",
        type: String,
       set: (v) => v === "" ? "" : v,
  },
   
        
    //    // default: "https://unsplash.com/photos/mountains-stand-out-against-a-colorful-sunset-pzbm-wp8fa0",
    //     type: String,
    //     set: (v) => v === "" ? "" : v,
    // },
    price: Number,
    location: String,
    country: String

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;