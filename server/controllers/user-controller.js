const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Signup new User
const signup = async (req, res) => {
  console.log(req.body);
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all the information" });
  }
  let existingUser;

  existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists. Login Instead!!" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  try {
    const result = await user.save();
    result.password = "";
    console.log("result: >>>" + result);
    const token = jwt.sign({ id: result._id }, JWT_SECRET_KEY);
    return res.status(200).json({ token, result });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

// Login existing User
const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "User does not exist. Please sign in" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Please check your password" });
  }

  const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY);
  console.log("token" + token);
  return res.status(200).json({ token, result: existingUser });
};

// Updating user info

const user = async (req, res) => {
  console.log(req.body);
  const {
    user_id,
    age,
    dob_day,
    dob_month,
    dob_year,
    gender,
    mobile,
    url,
    about,
    token,
  } = req.body;

  try {
    console.log("running1");
    const auth = jwt.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.log("running");
        return res.status(401).send({ err });
      }

      const result = await User.findByIdAndUpdate(user_id, {
        token,
        age,
        dob_day,
        dob_month,
        dob_year,
        gender,
        mobile,
        url,
        about,
      });

      console.log("result" + result);
      return res.status(200).json({ result });
    });
  } catch (err) {
    return res.status(400).json({ err });
  }
};


// Fetch info of User
const userinfo = async (req, res) => {
  console.log(req);
  fetchid = req.params.id;

  try {
    User.findOne({ _id: fetchid }, (err, val) => {
      return res.status(200).json({ val });
    });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

exports.signup = signup;
exports.login = login;
exports.user = user;
exports.userinfo = userinfo;
