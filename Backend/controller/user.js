const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const sendMail = require("../config/mail");

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
                            // return res.send({ message: `Welcome ${user.name}` });
                            if (user.role === "User"){
                                return res.send({ message: `Welcome ${user.name} (User)` });
                            } 
                            else {
                                return res.send({ message: `Welcome ${user.name} (Admin)` });
                            }
                        }
                    })
                }
                else {
                    res.send({msg: "User does not exist"})
                }
            })
        }
    },

    checkEmail: (req,res) => {
        const email = req.body.email;
        if (!email){
            res.send({msg: "Please fill the email field"})
        }
        else {
            User.findOne({email: email}).exec((err, user) => {
                if (!user){
                    res.send({ msg: "Not a User" })
                }
                else {
                    res.send({ msg: "A User" })
                }
            })    
        }

    },
    
    forgotPassword: (req, res) => {

        const { newPassword, newPassword2 } = req.body;

        if (!newPassword || !newPassword2){
            res.send({msg: "Please fill all the fields"})
        }
        if (newPassword !== newPassword2){
            res.send({msg: "Password mismatch"})
        }
        else {
            User.findOne().exec((err, user) => {
                user.password = newPassword;

                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) throw err; 
                        user.password = hash;
                        user
                        .save()
                        .then((value) => {
                            res.send("Password Changed");
                        })
                        .catch((value) => console.log(value));
                    })
                )
            })
        }

    },

    chat: (req,res) => {
        
    }
}