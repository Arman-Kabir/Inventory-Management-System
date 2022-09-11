const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');


const app = require('./app');

// database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log(`Database connection is successful`  .red.bold);
})

// server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`.yellow.bold);
})