const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../src/models/campground");

dotenv.config();

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: "5f5c330c2cd79d538f2c66d9",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/483251",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
            price,
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
