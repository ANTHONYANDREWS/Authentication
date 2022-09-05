require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user-routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.URI)
.then(()=>{
    app.listen(PORT);
    console.log("abc")
})
.catch((err)=>console.log(err));
