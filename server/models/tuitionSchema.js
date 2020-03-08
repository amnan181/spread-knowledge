var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Tuition = new Schema({
    _id: String,
    trSenderId: String,
    trCity: String,
    trAddress: String,
    trClass: String,
    trDegreeL: String,
    trDegreeT: String,
    trSubject: String,
    trPostedAt: String,
    timeFrom: String,
    timeTo: String,
});
const tuitionCollection = mongoose.model("tuitions", Tuition);

module.exports = tuitionCollection;