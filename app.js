const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// middlewares
app.use(express.json());
app.use(cors());

// schema design
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product"],
        trim: [true, "Name must be unique"],
        unique: true,
        minLength: [3, "Name must be at least 3 charecters"],
        maxLength: [100, "Name is too large"]
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"],
    },
    unit: {
        type: String,
        required: true,
        enum: {
            value: ["kg", "liter", "pcs"],
            message: "Unit value can't be {VALUE}, must be kg/liter/pcs"
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity ccan't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true
                } else {
                    return false
                }
            }
        },
        message:"Quantity must be an integer"
    },
    status:{
        type:String,
        required:true,
        enum:["In-Stock","Out-of-stock","Discontinued"],
        message:"Status can't be {VALUE}"
    },
    // createdAt:{
    //     type:Date,
    //     default:Date.now,
    // },
    // updatedAt:{
    //     type:Date,
    //     default:Date.now
    // }
    supplier:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Supplier"
    },
    categories:[{
        name:{
            type:String,
            required:true
        },
        _id:mongoose.Schema.Types.ObjectId 
    }]
},{
    timestamps:true,
    // _id:true
});

app.get("/", (req, res) => {
    res.send("Route is working! Yay!");
})

module.exports = app;