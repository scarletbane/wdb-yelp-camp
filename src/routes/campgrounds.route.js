const express = require("express");
const moment = require("moment");
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError");
const Campground = require("../models/campground");

const router = express.Router();

router.get("/", async (req, res) => {
    const campgrounds = await Campground.find({});

    res.render("pages/campgrounds/index", {
        title: "Campgrounds",
        campgrounds: campgrounds,
    });
});

router.get("/new", (req, res) => {
    res.render("pages/campgrounds/new", {
        title: "New Campground",
    });
});

router.get(
    "/:id",
    catchAsync(async (req, res) => {
        const id = req.params.id;
        const campground = await Campground.findOne({ _id: id });

        res.render("pages/campgrounds/show", {
            title: campground.title,
            campground: campground,
            lastUpdatedRelative: moment(campground.lastUpdated).fromNow(),
        });
    })
);

router.get(
    "/:id/edit",
    catchAsync(async (req, res) => {
        const id = req.params.id;
        const campground = await Campground.findById(id);

        res.render("pages/campgrounds/edit", {
            title: campground.title,
            campground: campground,
        });
    })
);

router.post(
    "/new",
    catchAsync(async (req, res) => {
        const newCampground = {
            ...req.body.campground,
            dateCreated: moment().format(),
            lastUpdated: moment().format(),
        };

        const campground = await new Campground(newCampground).save();
        res.redirect(`/campgrounds/${campground._id}`);
    })
);

router.patch(
    "/:id",
    catchAsync(async (req, res) => {
        const updatedCampground = {
            ...req.body.campground,
            lastUpdated: moment().format(),
        };

        const campground = await Campground.findByIdAndUpdate(
            req.params.id,
            updatedCampground
        );
        res.redirect(`/campgrounds/${campground._id}`);
    })
);

router.delete(
    "/:id",
    catchAsync(async (req, res) => {
        const id = req.params.id;
        await Campground.findByIdAndDelete(id);

        res.redirect("/campgrounds");
    })
);

module.exports = router;
