var app = require('express').Router();
var tuitionCollection = require('../models/tuitionSchema');
var getByToken = require('../middlewares/verifytoken');

app.post('/deleteTuition', (req, res) => {
  tuitionCollection
      .findOneAndDelete({_id: req.body._id})
      .exec(function (err, response) {
          if (err) {
              return res.json({ err: err })
          }
          res.json({ tuition: response })
      });
})

app.post('/getTuition', (req, res) => {
  tuitionCollection
      .findById(req.body._id)
      .exec(function (err, response) {
          if (err) {
              return res.json({ err: err })
          }
          res.json({ tuition: response })
      });
})

app.post('/updateTuition', (req, res) => {
  tuitionCollection
      .findOneAndUpdate(
        {_id: req.body._id},
        {
            trSenderId: req.body.trSenderId,
            trCity: req.body.trCity,
            trAddress: req.body.trAddress,
            trClass: req.body.trClass,
            trDegreeL: req.body.trDegreeL,
            trDegreeT: req.body.trDegreeT,
            trSubject: req.body.trSubject,
            trPostedAt: req.body.trPostedAt,
            timeFrom: req.body.timeFrom,
            timeTo: req.body.timeTo
        })
      .exec(function (err, response) {
          if (err) {
              return res.json({ err: err })
          }
          res.json({ tuition: response })
      });
})

app.post("/addTuition", getByToken, function(req, res) {
  let tuition = new tuitionCollection({ 
        _id: req.body._id,
        trSenderId: req.body.trSenderId,
        trCity: req.body.trCity,
        trAddress: req.body.trAddress,
        trClass: req.body.trClass,
        trDegreeL: req.body.trDegreeL,
        trDegreeT: req.body.trDegreeT,
        trSubject: req.body.trSubject,
        trPostedAt: req.body.trPostedAt,
        timeFrom: req.body.timeFrom,
        timeTo: req.body.timeTo
  });
  
    tuition
    .save((err, user) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
      res.json({ success: true, data: user })
    });
})


app.get("/getAllTuitions", function(req, res) {
    tuitionCollection
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