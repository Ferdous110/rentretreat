const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/rentRetreat";

main().then(() => {
    console.log("Connected to DB")
}).catch((err) => {
    console.log(err)
});

async function main() {
    await mongoose.connect(MONGO_URL);
}
 
app.get ("/", (req, res) => {
    res.send("hi i am root");
});

app.get("/testListing", async (req, res) => {
    let sampleListing = Listing({
        title: "My new Villa",
        descriptios: "By the Beach",
         price: 1200,
         location: "Dhaka",
        country: "Bangladesh",
    });
    await sampleListing.save();
    console.log("sample was save");
    res.send("succesfull testing");

});

app.listen(5000, () => [
    console.log("Server is listening to port 5000")
]);