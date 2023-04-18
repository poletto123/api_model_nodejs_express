require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8080;

//encrypt those
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;


app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);

mongoose
    .connect(
    // URL for local MongoDB
        'mongodb://localhost:27017'
    // URL for MongoDB Atlas
    //    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ihqnuur.mongodb.net/mydatabase?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT);
    })
    .catch((err) => console.log(err));