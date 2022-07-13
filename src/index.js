const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// routes import
const authRoutes = require('./routes/auth');
// routes import end

dotenv.config();

const app = express();
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Successfully connected to Database"))
.catch(err => console.log(err));


// routes
app.use('/api/auth', authRoutes);

app.listen(8080, () => {
    console.log("Running on http://localhost:8080");
})