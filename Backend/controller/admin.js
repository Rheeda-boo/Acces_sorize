const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Product = require("../models/product");


module.exports = {
    addUser: (req,res) => {
        
        console.log(req.body);

        const {name, email, password, password2, phone, location, role} = req.body;
        if(!name || !email || !password || !password2 || !phone || !location || !role) {
            res.send({msg: "Please fill all the fields"})
        };

        // if(password.length < 7) {
        //     res.send({msg: "Password must be at least 8 charcters"})            
        // }

        if (password !== password2){
            res.send({msg: "Password mismatch"})

        }

        else {
            User.findOne({email: email}).exec((err, user) => {
                if(user){
                    res.send({ msg: "Already a User" })
                }
                else {
                    const newUser = new User({
                        name: name,
                        email: email,
                        password: password,
                        phone: phone,
                        location: location,
                        role: role,
                        created: Date.now()
                    });

                    bcrypt.genSalt(10, function (err, salt)  {
                        bcrypt.hash(newUser.password, salt, function(err, hash){
                    
                            if (err) throw err;  
                            newUser.password = hash;
                            newUser
                            .save()
                            .then((value) => {
                                res.send(`${newUser.role}  Created`);
                            })
                            .catch((value) => console.log(value));
                        })
                    }
                    )
                }
            })
        };
        
    },

    addProduct: (req ,res) => {

        const {productName, price, category} = req.body;

        if(!productName || !price || !category ) {
            res.send({msg: "Please fill all the fields"})
        }
        else {
            Product.findOne({productName: productName}).exec((err, product) => {
                if(product){
                    res.send({ msg: "Name already exists" })
                }
                else {
                    const newProduct = new Product({
                        productName: productName,
                        price: price,
                        category: category
                       
                    })
                    .save()
                    .then((value) => {
                        res.send("Product Added");
                    })
                    .catch((value) => console.log(value));
                }    
            })
        }
    }   
}