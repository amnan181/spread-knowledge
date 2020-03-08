var app = require('express').Router();
var multer = require("multer")
var tutorCollection = require('../models/tutorSchema');
var findByToken = require('../middlewares/verifytoken');

app.post('/deleteTutor', findByToken, (req, res) => {
  tutorCollection
      .findOneAndDelete({_id: req.body._id})
      .exec(function (err, response) {
          if (err) {
              return res.json({ err: err })
          }
          res.json({ tutor: response })
      });
})

app.post('/getTutor', findByToken, (req, res) => {
  tutorCollection
      .findById(req.body._id)
      .exec(function (err, response) {
          if (err) {
              return res.json({ err: err })
          }
          res.json({ tutor: response })
      });
})

app.post('/updateTutor', findByToken, (req, res) => {
  tutorCollection
      .findOneAndUpdate(
        {_id: req.body._id},
        {
          tName: req.body.tName,
          tEmail: req.body.tEmail,
          tPassword: req.body.tPassword,
          tPhone: req.body.tPhone,
          tGender: req.body.tGender,
          imgURL: req.body.imgURL,
          tCity: req.body.tCity,
          tAddress: req.body.tAddress,
          tAbout: req.body.tAbout,
          tDegreeL: req.body.tDegreeL,
          tDegreeT: req.body.tDegreeT,
          eDegreeL: req.body.eDegreeL,
          eDegreeT: req.body.eDegreeT,
          wttDegreeL: req.body.wttDegreeL,
          wttDegreeT: req.body.wttDegreeT,
          subject1: req.body.subject1,
          subject2: req.body.subject2,
          subject3: req.body.subject3,
          fFrom: req.body.fFrom,
          fTo: req.body.fTo
        }, {new: true})
      .exec(function (err, response) {
        console.log("RES===>", response)
          if (err) {
              return res.statusCode(400).json({ err: err })
          }
          res.json({ tutor: response })
      });
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+file.originalname)
  }
})
 
var upload = multer({ storage: storage })

app.post("/addTutor",upload.single('imgURL'), function(req, res) {
  let tutor = new tutorCollection({ 
    _id: req.body._id,
    tName: req.body.tName,
    tEmail: req.body.tEmail,
    tPassword: req.body.tPassword,
    tPhone: req.body.tPhone,
    tGender: req.body.tGender,
    imgURL: req.file.path.slice(8),
    tCity: req.body.tCity,
    tAddress: req.body.tAddress,
    tAbout: req.body.tAbout,
    tDegreeL: req.body.tDegreeL,
    tDegreeT: req.body.tDegreeT,
    eDegreeL: req.body.eDegreeL,
    eDegreeT: req.body.eDegreeT,
    wttDegreeL: req.body.wttDegreeL,
    wttDegreeT: req.body.wttDegreeT,
    subject1: req.body.subject1,
    subject2: req.body.subject2,
    subject3: req.body.subject3,
    fFrom: req.body.fFrom,
    fTo: req.body.fTo
  });
  
    tutor
    .save((err, user) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
      res.json({ success: true, user })
    });
})


app.get("/getAllTutors", function(req, res) {
    tutorCollection
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