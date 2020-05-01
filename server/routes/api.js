const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;
const users = require("../models/users");
const tasklist = require("../models/tasklist");
var md5 = require("md5");
const jwt = require("jsonwebtoken");
const config = require("./config");

// Connect
mongoose.connect("mongodb://localhost:27017/dailyTask");

//Check Token function
const checkToken = (req) => {
  if (req.headers && req.headers["autherization"]) {
    let token = req.headers["autherization"];
    token = token.split(" ")[1];
    if (token) {
      let isValid;
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          isValid = false;
        } else {
          // req.decoded = decoded;
          isValid = true;
        }
      });
      return isValid;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// Get users
router.all("/signin", (req, res) => {
  var userID = req.body.userId;
  var password = md5(req.body.password);
  users.find({ userID: userID }, function (err, results) {
    if (err) {
      res.status(500).send({ message: "Something went wrong" });
    }
    if (results.length > 0) {
      if (results[0].password === password) {
        var data = {
          userID: results[0].userID,
          username: results[0].username,
          message: "Success",
          status: 1,
        };
        const token = jwt.sign(
          {
            userID: results[0].userID,
            username: results[0].username,
          },
          config.secret,
          {
            expiresIn: "24h", // expires in 24 hours
          },
          "test"
        );
        res.send({ data, token });
      } else {
        res.status(401).send({ message: "Password is incorrect" });
      }
    } else {
      res.status(401).send({ message: "Email is not registered" });
    }
  });
});

router.all("/signup", (req, res) => {
  var username = req.body.username;
  var userID = req.body.userID;
  var password = md5(req.body.password);
  users.find({ userID: userID }, (err, results) => {
    if (err) {
      res.status(500).send({ message: "Something went wrong" });
    } else {
      if (results.length > 0) {
        res.status(401).send({ message: "Email already registered" });
      } else {
        users.create(
          { username: username, userID: userID, password: password },
          (err, results) => {
            if (err) {
              res.status(500).send({ message: "Something went wrong" });
            } else {
              const token = jwt.sign(
                {
                  userID: userID,
                  username: username,
                },
                config.secret,
                {
                  expiresIn: "24h",
                },
                "test"
              );
              res.send({ data, token });
            }
          }
        );
      }
    }
  });
});
//Add New Task
router.all("/addTask", (req, res) => {
  let isAuthenticated = checkToken(req);
  if (isAuthenticated) {
    const userID = req.body.userID;
    const username = req.body.username;
    const headline = req.body.headline;
    const description = req.body.description;
    const date = req.body.date;
    tasklist.create(
      {
        username: username,
        userID: userID,
        headline: headline,
        description: description,
        date: date,
      },
      (err, results) => {
        if (err) {
          res.status(500).send({ message: "Something went wrong" });
        } else {
          tasklist.find({}, (err, results) => {
            if (err) {
              res.status(500).send({ message: "Something went wrong" });
            } else {
              res.send({ data: results });
            }
          });
        }
      }
    );
  } else {
    return res.status(401).send({
      message: "Auth token is not supplied",
    });
  }
});

//Get Task List
router.all("/getTaskList", (req, res) => {
  let isAuthenticated = checkToken(req);
  if (isAuthenticated) {
    tasklist.find({}, (err, results) => {
      if (err) {
        res.status(500).send({ message: "Something went wrong!" });
      } else {
        res.send({ data: results });
      }
    });
  } else {
    return res.status(401).send({
      message: "Auth token is not supplied",
    });
  }
});

//Edit Task List
router.all("/editTaskList", (req, res) => {
  let isAuthenticated = checkToken(req);
  if (isAuthenticated) {
    const userID = req.body.userID;
    const username = req.body.username;
    const headline = req.body.headline;
    const description = req.body.description;
    const date = req.body.date;
    const id = req.body.id;
    tasklist.updateOne(
      { _id: ObjectID(id) },
      {
        username: username,
        userID: userID,
        headline: headline,
        description: description,
        date: date,
      },
      (err, results) => {
        if (err) {
          res.status(500).send({ message: "Something went wrong" });
        } else {
          tasklist.find({}, (err, results) => {
            if (err) {
              res.status(500).send({ message: "Something went wrong" });
            } else {
              res.send({ status: 1, data: results });
            }
          });
        }
      }
    );
  } else {
    return res.send({
      success: false,
      message: "Auth token is not supplied",
    });
  }
});

module.exports = router;
