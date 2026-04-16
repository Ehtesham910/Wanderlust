const express= require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");

async function main(){
    await mongoose.connect("mongodb://localhost:27017/wanderlust");
}

main().then(()=>{
    console.log("connected to db");
}).catch(err =>{
    console.log(err);
})

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
//method override
app.use(methodOverride("_method"));
//ejs-mate
app.engine("ejs", ejsMate);
// use public folder for static assets
app.use(express.static(path.join(__dirname, "/public")));


app.get("/", (req,res)=>{
    res.send("Hi, i am root");
});

// validateListing function
const validateListing = (req, res, next) => {
    let error = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};



// Index Route
app.get("/listings", wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));

// new listing form
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
})

// Show Route
app.get("/listings/:id",wrapAsync( async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
}));

// Create Route
// app.post("/listings", wrapAsync(async (req, res) => {
//     let result = listingSchema.validate(req.body);
//     console.log(result);
//     if (result.error) {
//         throw new ExpressError(400, result.error);
//     }
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
// }));

app.post("/listings", validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings"); 
}));


//Edit route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

// update route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");
}));

// delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

// app.get("/testListing", async (req,res)=>{
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: " By the Beach",
//         price: 12000,
//         location: "Calangute, Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// })

// Midddleware
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs", {err});
});

app.listen(8080, ()=>{
    console.log("server is listening on port 8080");
});