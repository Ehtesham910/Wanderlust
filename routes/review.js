const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { validateReview, isLoggedIn, isReviewAuther} = require("../middleware.js");

// Post Review Route
//  listings/:id/reviews
router.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
}));

// Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuther, wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: { reviews: reviewId }});

    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
}));


module.exports = router;