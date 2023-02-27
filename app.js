const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => {
    console.log('Database connected');
});

const app = express();
const port = 3000;

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/js', express.static(path.join(__dirname, '/node_modules/@popperjs/core/dist/umd')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('pages/home', {title: 'Home'});
});

app.listen(port, () => {
    console.log(`App listening on port ${port}. Click the link http://localhost:${port}.`)
});