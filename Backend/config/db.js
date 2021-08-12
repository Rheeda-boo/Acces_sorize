const mongoose = require("mongoose");
const connection = mongoose.connection;

mongoose.connect( 
    "mongodb://localhost:27017/Acces_sorize",
    {useNewUrlParser: true}, 
    {useUnifiedTopology: true } 
);

connection.on("connected", () => {
    console.log("Database Connected")
});

connection.on("disconnected", () => {
    console.log("Database not Connected")
});

connection.on("error", (error) => {
    console.log(error)
});