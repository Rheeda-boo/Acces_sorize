const express =  require("express");
const app = express();
const logger = require("morgan");
const database = require("./config/db")

const userRouter = require("./routers/user");
const adminRouter = require("./routers/admin");

app.use(logger("start"));
app.use(express.json());
app.use(express.urlencoded());
app.use("/user", userRouter);
app.use("/admin", adminRouter);

const port = 5000;

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
});