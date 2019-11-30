// tools we need
const express = require('express');
const cors = require('cors');
// mongoose helps connect to mongodb database
const mongoose = require('mongoose');

// setting up server
const app = express();
const PORT = process.env.PORT || 5000;

// cors middeware
app.use(cors());

// helps to parse json
app.use(express.json());

//dealing with updates to mongodb
//mongoose.connect(process.env.MONGODB_URI || "mongodb://scott:mernstackapp1@ds029277.mlab.com:29277/heroku_8npb236z");
const connection = mongoose.connection;

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// whenever go to that url, it will load everything in the second parameter
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/build"));
}

//const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.MONGODB_URI || "mongodb://heroku:mernstackapp2@ds029277.mlab.com:29277/heroku_8npb236z", { 
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true 
}
);

// starts listening and starts the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});