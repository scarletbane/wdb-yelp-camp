const mongoose = require("mongoose");
const { Schema } = mongoose;

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    image: String,
    description: String,
    location: String,
    dateCreated: String,
    lastUpdated: String,
});

module.exports = mongoose.model("Campground", CampgroundSchema);
