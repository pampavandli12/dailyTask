const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const users = require('../models/users');

// Connect
mongoose.connect('mongodb://localhost:27017/dailyTask');
// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.all('/users', (req, res) => {
    console.log("API called");
    users.find(function (err, results) {
        if (err) return console.error(err);
        res.send(results);
    });
});

module.exports = router;