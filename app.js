const express = require("express");
const app = express();
const mongoose = require("mongoose");

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

app.listen(5000, () => [
    console.log("Server is listening to port 5000")
]);