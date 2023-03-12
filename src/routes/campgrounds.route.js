const express = require("express");
const moment = require("moment");
const Campground = require("../models/campground");

const router = express.Router();

router.get("/", async (req, res) => {
    const campgrounds = await Campground.find({});

    res.render("pages/campgrounds/index", {
        title: "Campgrounds",
        campgrounds: campgrounds,
        moment: moment,
    });
});

router.get("/new", (req, res) => {
    res.render("pages/campgrounds/new", {
        title: "New Campground",
        moment: moment,
    });
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findOne({ _id: id });

    res.render("pages/campgrounds/show", {
        title: campground.title,
        campground: campground,
        lastUpdatedRelative: moment(campground.lastUpdated).fromNow(),
    });
});

router.get("/:id/edit", async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);

    res.render("pages/campgrounds/edit", {
        title: campground.title,
        campground: campground,
        moment: moment,
    });
});

router.post("/new", async (req, res) => {
    const campground = await new Campground(req.body.campground).save();
    res.redirect(`/campgrounds/${campground._id}`);
});

router.patch("/:id", async (req, res) => {
    const campground = await Campground.findByIdAndUpdate(
        req.params.id,
        req.body.campground
    );
    res.redirect(`/campgrounds/${campground._id}`);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await Campground.findByIdAndDelete(id);

    res.redirect("/campgrounds");
});

module.exports = router;
