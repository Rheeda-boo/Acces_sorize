const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");


module.exports = {
    signup: (req,res) => {
        const {name, email, password, password2, phone, location} = req.body;
        if(!name || !email || !password || !password2 || !phone || !location) {
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
                        role: "User",
                        created: Date.now()
                    });
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                          
                            newUser.password = hash;
                            newUser
                            .save()
                            .then((value) => {
                                res.send("User Created");
                            })
                            .catch((value) => console.log(value));
                        })
                    )
                }
            })
            
        };
    },

    login: (req,res) => {
        const {email, password} = req.body;
        if(!email || !password) {
            res.send({msg: "Please fill all the fields"})
        }
        else{
            User.findOne({email: email}).exec((err, user) => {
                if(user){
                    bcrypt.compare(password, user.password)
                    .then(doMatch => {
                        if (doMatch) {
                            return res.send({ message: `Welcome ${user.name}` }); 
                        }
                    })
                }
            })
        }
    }    
}