const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js")
const multer = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

router
    .route("/")
    // Index Route
    .get(wrapAsync(listingController.index))
    // Create Route
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing)
    );

router
    .route("/new")
    // new listing form
    .get( isLoggedIn, listingController.renderNewForm);


router
    .route("/:id")
    // Show Route
    .get(wrapAsync(listingController.showListing))
    // update route
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing))
    // delete route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

router
    .route("/:id/edit")
    //Edit route
    .get(isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;