const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  age: {
    type: String,
    default: "",
  },
  dob_day: {
    type: String,
    default: "",
  },
  dob_month: {
    type: String,
    default: "",
  },
  dob_year: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  mobile: {
    type: String,
    default: "",
  },
  img: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
