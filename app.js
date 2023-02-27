const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

dotenv.config();

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("open", () => {
    console.log("Database connected");
});

const app = express();
const port = 3000;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));

// use static files
app.use(
    "/js",
    express.static(
        path.join(__dirname, "/node_modules/@popperjs/core/dist/umd")
    )
);
app.use(express.static(path.join(__dirname, "/node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    res.render("pages/home", { title: "Home" });
});

app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});

    res.render("pages/campgrounds/index", {
        title: "Campgrounds",
        campgrounds: campgrounds,
    });
});

app.get("/campgrounds/:id", async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findOne({ _id: id });

    res.render("pages/campgrounds/show", {
        title: campground.title,
        campground: campground,
    });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("pages/campgrounds/new", { title: "New Campground" });
});

app.get("/campgrounds/:id/edit", (req, res) => {
    res.render("pages/campgrounds/edit");
});

app.post("/campground/:id", async (req, res) => {});

app.delete("/campgrounds/:id", async (req, res) => {
    const id = req.params.id;
    await Campground.deleteOne({ _id: id });

    res.redirect("/campgrounds");
});

app.patch("/campgrounds/:id", async (req, res) => {});

app.listen(port, () => {
    console.log(
        `App listening on port ${port}. Click the link http://localhost:${port}`
    );
});
