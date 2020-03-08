var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Proposal = new Schema({
    _id: String,
    tutorID: String,
    tuitionID: String,
    description: String,
    fee: String
});
const proposalCollection = mongoose.model("proposals", Proposal);

module.exports = proposalCollection;