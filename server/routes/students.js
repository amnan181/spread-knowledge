var app = require('express').Router();
var studentCollection = require('../models/studentSchema');
var findByToken = require('../middlewares/verifytoken');

app.post('/deleteStudent', (req, res) => {
  studentCollection
      .findOneAndDelete({_id: req.body._id})
      .exec(function (err, response) {
          if (err) {
              return res.json({ err: err })
          }
          res.json({ student: response })
      });
})

app.post('/getStudent', (req, res) => {
  studentCollection
      .findById(req.body._id)
      .exec(function (err, response) {
          if (err) {
              return res.json({ err: err })
          }
          res.json({ student: response })
      });
})

app.post('/updateStudent', findByToken, (req, res) => {
  studentCollection
      .findOneAndUpdate(
        {_id: req.body._id},
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          gender: req.body.gender,
          city: req.body.city,
          address: req.body.address,
          sClass: req.body.sClass,
          subject1: req.body.subject1,
          subject2: req.body.subject2,
          subject3: req.body.subject3
        }, {new: true})
      .exec(function (err, response) {
          if (err) {
              return res.json({ err: err })
          }
          res.json({ student: response })
      });
})

app.post("/addStudent", function(req, res) {
  let student = new studentCollection({ 
    _id: req.body._id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    city: req.body.city,
    address: req.body.address,
    sClass: req.body.sClass,
    subject1: req.body.subject1,
    subject2: req.body.subject2,
    subject3: req.body.subject3
  });
  
    student
    .save((err, user) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
      res.json({ success: true, user })
    });
})


app.get("/getAllStudents", function(req, res) {
    studentCollection
    .find()
    .exec((err, data) => {
        if (err) {
        res.json("error occored: ", err);
        } else {
        res.json(data);
        }
    });
  })  


module.exports = app;