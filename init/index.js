const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect("mongodb://localhost:27017/wanderlust");
}

main().then(() => {
    console.log("connected to db");
}).catch(err => {
    console.log(err);
})

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "69f8f9bec6452605ff40f873"
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
} 

initDB();