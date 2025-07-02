const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const warpAsync = require("./utils/warpAsync.js");
//const ExpressError = require("./utils/ExpressError");
const { listingSchema } = require("./schema.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/rentRetreat";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// app.get("/, (req, res) => {
//   res.send("hi i am root");
// });

// Index Route

app.get("/listings", warpAsync(async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
}));

// New Route

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route

app.get("/listings/:id", warpAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

// create Route

app.post("/listings", warpAsync(async (req, res, next) => {
  let result = listingSchema.validate(req.body);
  console.log(result)
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
  
})
);
// Edit  Router
app.get("/listings/:id/edit", warpAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

// Update Route

app.put("/listings/:id", warpAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

// Delete Route

app.delete("/listings/:id", warpAsync(async (req, res) => {
  let { id } = req.params;
  let deletedlisting = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));

// app.get("/testListing", async (req, res) => {
//     let sampleListing = Listing({
//         title: "My new Villa",
//         descriptios: "By the Beach",
//          price: 1200,
//          location: "Dhaka",
//         country: "Bangladesh",
//     });
//     await sampleListing.save();
//     console.log("sample was save");
//     res.send("succesfull testing");

// });

// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"))
// });

app.use((err, req, res, next) => {
  let {statusCode = 500, message = "something went wrong!"} = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});


app.listen(5000, () => [console.log("Server is listening to port 5000")]);
