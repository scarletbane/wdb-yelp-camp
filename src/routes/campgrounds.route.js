const express = require("express");
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
    res.render("pages/campgrounds/new", { title: "New Campground" });
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findOne({ _id: id });

    res.render("pages/campgrounds/show", {
        title: campground.title,
        campground: campground,
    });
});

router.get("/:id/edit", async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);

    res.render("pages/campgrounds/edit", {
        title: campground.title,
        campground: campground,
    });
});

router.post("/new", (req, res) => {});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await Campground.findByIdAndDelete(id);

    res.redirect("/campgrounds");
});

router.patch("/:id", async (req, res) => {});

module.exports = router;
