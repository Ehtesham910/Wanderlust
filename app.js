const express= require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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

// Index Route
app.get("/listings", async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

// new listing form
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
})

// Show Route
app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

// Create Route
app.post("/listings", async (req,res)=>{
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
})


//Edit route
app.get("/listings/:id/edit", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})

// update route
app.put("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect("/listings");
})

// delete route
app.delete("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})

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

app.listen(8080, ()=>{
    console.log("server is listening on port 8080");
});