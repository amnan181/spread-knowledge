var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Tutor = new Schema({
    _id: String,
    tName: String,
    tEmail: String,
    tPassword: String,
    imgURL: String,
    tGender: String,
    tAbout: String,
    tPhone: String,
    tCity: String,
    tAddress: String,
    tDegreeL: String,
    tDegreeT: String,
    eDegreeL: String,
    eDegreeT: String,
    wttDegreeL: String,
    wttDegreeT: String,
    subject1: String,
    subject2: String,
    subject3: String,
    fFrom: String,
    fTo: String
});
const tutorCollection = mongoose.model("tutors", Tutor);

module.exports = tutorCollection;