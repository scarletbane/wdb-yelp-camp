const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}. Click the link http://localhost:${port}.`)
});