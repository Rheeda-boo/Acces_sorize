const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
    productName : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    // description : {
    //     type : String,
    //     required : true
    // },
    
});

module.exports = mongoose.model("Product", product)