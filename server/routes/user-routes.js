const express = require('express');
const{signup, login,user, userinfo} = require("../controllers/user-controller");
const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.put("/user", user);
router.get("/userinfo/:id", userinfo);


// router.get("/user",verifyToken, getUser);

module.exports = router;