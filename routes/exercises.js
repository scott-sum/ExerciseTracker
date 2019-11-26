const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// route for localhost:5000/exercises/
// find() is a mongoose method to get all exercises from database and returns a promise
// after find(), "then" return all exercises in json format
// otherwise, return the error (.catch)
router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

// for the endpoint localhost:5000/exercises/add
router.route('/add').post((req, res) => {

    //get variables from the body
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    //create new exercise with the variables above
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    // save() saves new Exercise in database and
    // returns 'Exercise added!' in json or the error otherwise
    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//return info as json or error depending on id provided
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.satatus(400).json('Error: ' + err));
});

// delete an exercise
router.route('/:id').delete((req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// update an exercise
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;