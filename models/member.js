const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  nic: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  mname: {
    type: String,
  },
  lname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  usertype: {
    type: String,
    required: true,
  },
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
