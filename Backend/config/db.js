const mongoose = require("mongoose");
const connection = mongoose.connection;

mongoose.connect( 
    "mongodb+srv://acces_sorize:rheeda123@cluster0.2visz.mongodb.net/Acces_sorize",
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