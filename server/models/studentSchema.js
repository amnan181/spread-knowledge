var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Student = new Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
    gender: String,
    city: String,
    address: String,
    sClass: String,
    subject1: String,
    subject2: String,
    subject3: String
});
const studentCollection = mongoose.model("students", Student);

module.exports = studentCollection;