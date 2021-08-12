const express =  require("express");
const app = express();

const database = require("./config/db")

const userRouter = require("./routers/user");

app.use(express.json());
app.use("/user", userRouter);

const port = 5000;

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
});