const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user =  new Schema({
    name: { 
        type :String,
    }, 
    email:  { 
        type :String,
    }, 
    password:  { 
        type :String,
    },  
    phone:  { 
        type :Number,
    }, 
    location:  { 
        type :String,
    },
    role:  { 
        type :String,
    },
    created:  { 
        type :String,
    },
});

module.exports = mongoose.model("User", user);