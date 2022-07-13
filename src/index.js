const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Successfully connected to Database"))
.catch(err => console.log(err));

app.listen(8080, () => {
    console.log("Running on https://localhost://8080");
})