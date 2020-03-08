var app = require('express').Router();
var proposalCollection = require('../models/proposalSchema');
var getByToken = require('../middlewares/verifytoken');

app.post('/deleteProposal', (req, res) => {
  proposalCollection
      .findOneAndDelete({_id: req.body._id})
      .exec(function (err, response) {
          if (err) {
              return res.json({ err: err })
          }
          res.json({ proposal: response })
      });
})

app.post('/getProposal', (req, res) => {
  proposalCollection
      .findById(req.body._id)
      .exec(function (err, response) {
          if (err) {
              return res.json({ err: err })
          }
          res.json({ proposal: response })
      });
})

app.post('/updateProposal', (req, res) => {
  proposalCollection
      .findOneAndUpdate(
        {_id: req.body._id},
        {
            tutorID: req.body.tutorID,
            tuitionID: req.body.tuitionID,
            description: req.body.description,
            fee: req.body.fee
        })
      .exec(function (err, response) {
          if (err) {
              return res.json({ err: err })
          }
          res.json({ proposal: response })
      });
})

app.post("/addProposal", getByToken, function(req, res) {
  let proposal = new proposalCollection({ 
    _id: req.body._id,
    tutorID: req.body.tutorID,
    tuitionID: req.body.tuitionID,
    description: req.body.description,
    fee: req.body.fee
  });
  
    proposal
    .save((err, proposal) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
      res.json({ success: true, proposal })
    });
})


app.get("/getAllProposals", function(req, res) {
    proposalCollection
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