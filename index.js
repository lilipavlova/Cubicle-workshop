require('dotenv').config()
const env = process.env.NODE_ENV || 'development';
const mongoose = require("mongoose")

const config = require('./config/config')[env];
const express = require('express')
const app = express();
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const cubeRouter = require("./routes/cube");
const accessoryRouter = require("./routes/accessory");

mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false

}, (err) => {
    if (err) {
        console.err(err);
        throw err;
    }

    console.log("DB is setup and running")
})


require('./config/express')(app);

app.use("/", accessoryRouter);
app.use("/", authRouter);
app.use("/", cubeRouter);
app.use("/", indexRouter);


app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));