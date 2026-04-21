const express= require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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



// use listings routes
app.use("/listings", listings);

// use Review routes
app.use("/listings/:id/reviews", reviews); 


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