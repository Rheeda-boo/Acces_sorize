const database = require("./config/db");
const User = require("./models/user");
const bcrypt = require("bcrypt");

const importData = () => {
  const newUser = new User({
    name: "Admin User",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",

  });

  //hash password
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      //save pass to hash
      newUser.password = hash;
      //save user
      newUser
        .save()
        .then((value) => {
          console.log(value);
         process.exit(0);
        })
        .catch((value) =>{
            console.log(value);
            process.exit(1);
        } );
    })
  );
};

importData();