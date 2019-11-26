const router = require('express').Router();
let User = require('../models/user.model');

// route for localhost:5000/users/
// find() is a mongoose method to get all users from database and returns a promise
// after find(), "then" return all users in json format
// otherwise, return the error (.catch)
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// for the endpoint localhost:5000/users/add
router.route('/add').post((req, res) => {
    //get the username from the body
    const username = req.body.username;

    // create a new user with the username above
    const newUser = new User({username});

    // save() saves new user in database and
    // returns 'User added!' in json or the error otherwise
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;