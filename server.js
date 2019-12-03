/*// tools we need
const express = require('express');
const cors = require('cors');
// mongoose helps connect to mongodb database
const mongoose = require('mongoose');

// setting up server
const app = express();
const port = process.env.PORT || 5000;

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
    app.use(express.static("client/build/"));

    app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.use(express.static(path.join(__dirname, "client", "build")))




mongoose.connect(process.env.MONGODB_URI || "mongodb://scott:mernstackapp1@ds227525.mlab.com:27525/heroku_wgczpk05", { 
    //dealing with updates to mongodb
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true 
}
);

// starts listening and starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});*/
// Importing Modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 5000; 

mongoose.connect( process.env.MONGODB_URI || 'mongodb://scott:mernstackapp1@ds227525.mlab.com:27525/heroku_wgczpk05', {
    useNewUrlParser: true
});

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// whenever go to that url, it will load everything in the second parameter
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});