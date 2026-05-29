const mongoose = require("mongoose");
const axios = require("axios");
const Listing = require("../models/listing");

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

async function updateListings() {
    const listings = await Listing.find({});
    for (let listing of listings) {
        if (!listing.geometry || !listing.geometry.coordinates.length) {
            let location = `${listing.location}, ${listing.country}`;
            try {
                const response = await axios.get(
                    "https://nominatim.openstreetmap.org/search",
                    {
                        params: {
                            q: location,
                            format: "json",
                            limit: 1,
                        },
                        headers: {
                            "User-Agent": "wanderlust-app"
                        }
                    }
                );
                if (response.data.length > 0) {
                    let latitude = response.data[0].lat;
                    let longitude = response.data[0].lon;
                    listing.geometry = {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    };
                    await listing.save();
                    console.log(`Updated: ${listing.title}`);
                }

            } catch (err) {
                console.log(err);
            }
        }
    }
    mongoose.connection.close();
}
updateListings();