const mongoose = require("mongoose");

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
            values: ["kg", "liter", "pcs"],
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
        message: "Quantity must be an integer"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "Out-of-stock", "Discontinued"],
            message: "Status can't be {VALUE}"
        }

    },
    // createdAt:{
    //     type:Date,
    //     default:Date.now,
    // },
    // updatedAt:{
    //     type:Date,
    //     default:Date.now
    // }
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]
}, {
    timestamps: true
    // _id:true
});


// mongoose middlewares for saving data: pre/post
productSchema.pre('save', function (next) {

    console.log('Before saving data');
    if (this.quantity == 0) {
        this.status = 'out-of-stock';
    }
    next()
})

// productSchema.post('save',function(doc,next){
//     console.log('After saving data');

//     next()
// })

productSchema.methods.logger = function () {
    console.log(`Data saved for ${this.name} `);
}


// Schema ->Model -> Query
const Product = mongoose.model('Product', productSchema);


module.exports = Product;