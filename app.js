const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// middlewares
app.use(express.json());
app.use(cors());

// routes
const productRoute = require('./routes/product.route');
const brandRoute = require("./routes/brand.route");
const storeRoute = require("./routes/store.route");
const categoryRoute = require("./routes/category.route");



app.get("/", (req, res) => {
    res.send("Route is working! Yay!");

});

//  post route: posting to db
app.use('/api/v1/product', productRoute);
app.use('/api/v1/brand', brandRoute);
app.use('/api/v1/store', storeRoute);
app.use('/api/v1/category', categoryRoute);



module.exports = app;



// 3 methods to query in mongoose. find,findOne,findbyId