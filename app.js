const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ExpressError = require("./src/utilities/ExpressError");
const campgroundRoutes = require("./src/routes/campgrounds.route");

const port = process.env.PORT || 3000;

dotenv.config();

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Use static files
app.use(
    "/js",
    express.static(
        path.join(__dirname, "./node_modules/@popperjs/core/dist/umd")
    )
);
app.use(express.static(path.join(__dirname, "./node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "./src/public")));

app.use("/campgrounds", campgroundRoutes);

app.get("/", async (req, res) => {
    res.render("pages/home", { title: "Home" });
});

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong!";
    res.status(statusCode).render("pages/error", { title: "Error", err });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
