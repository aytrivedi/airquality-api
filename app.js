const express = require('express');
const routes = require('express').Router();
const airquality = require('./src/controllers/airqualityController');

const PORT = 3000;

const app = express();
app.use(routes);

app.get('/', (req, res) => {
    return res.status(200).send("hello world");
});


routes.use('/airquality', airquality);

app.listen(PORT, (err) => {
    if(err) {
        console.log("Server failed to start");
    } else {
        console.log("Server has started");
    }
});