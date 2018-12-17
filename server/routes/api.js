const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const users = require('../models/users');
const tasklist = require('../models/tasklist');
var md5 = require('md5');

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
router.all('/signin', (req, res) => {
    console.log("API called");
    var userID = req.body.userId;
    var password = md5(req.body.password);
    users.find({userID:userID},function (err, results) {
        if (err) {
            return console.error(err);  
        }
        if (results.length > 0) { 
            console.log(results[0].username);
            if (results[0].password === password) { 
                var data = {userID:results[0].userID,username:results[0].username,message:'Success',status:1};
                res.send(data);
            } else {
                res.send({message:'Password is incorrect',status:0})
            }
        } else {
            res.send({message:'Email is not registered',status:0})
        }
    });
});

router.all('/signup',(req, res) => {
    var username = req.body.username;
    var userID = req.body.userID;
    var password = md5(req.body.password);
    users.find({userID:userID},(err, results) => {
        if(err){
            return console.log(err);
        }
        else{
            if(results.length > 0){
                res.send({status:0,message:'Email already registered'});
            }else {
                users.create({username:username,userID:userID,password:password},(err, results) => {
                    if(err){
                        return console.log(err);
                    }else {
                        res.send({status:1,message:'Successfully signedup'});
                    }
                })
            }
        }
    })
});
//Add New Task
router.all('/addTask', (req, res) => {
    const userID = req.body.userID;
    const username = req.body.username;
    const headline = req.body.headline;
    const description = req.body.description;
    const date = req.body.date;
    tasklist.create({username:username,userID:userID,headline:headline,description:description,date:date},(err, results) => {
        if (err) {
            return condole.log(err);
        } else {
            res.send({status:1,message:'Successfully added'});
        }
    })
});

//Get Task List
router.all('/getTaskList', (req, res) => {
    tasklist.find({},(err, results) => {
        if (err) {
            return console.log(err);
        } else {
            res.send({status:1, data:results});
        }
    })
});

//Edit Task List
router.all('/editTaskList', (req, res) => {
    const userID = req.body.userID;
    const username = req.body.username;
    const headline = req.body.headline;
    const description = req.body.description;
    const date = req.body.date;
    const id = req.body.id;
    tasklist.update({_id:ObjectID(id)},{username:username,userID:userID,headline:headline,description:description,date:date}, (err, results) => {
        if (err) {
            return console.log(err);
        } else {
            res.send({status:1,message:'Successfully Updated'});
        }
    })
})

module.exports = router;