// tools we need
const express = require('express');
const cors = require('cors');
// mongoose helps connect to mongodb database
const mongoose = require('mongoose');

// setting up server
const app = express();
const PORT = process.env.PORT || 5000;

const path = require("path")

// cors middeware
app.use(cors());

// helps to parse json
app.use(express.json());

const connection = mongoose.connection;

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// whenever go to that url, it will load everything in the second parameter
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

app.use(express.static(path.join(__dirname, "client", "build")))




mongoose.connect(process.env.MONGODB_URI || "mongodb://heroku:mernstackapp2@ds029277.mlab.com:29277/heroku_8npb236z", { 
    //dealing with updates to mongodb
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true 
}
);

// starts listening and starts the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});