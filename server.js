const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv/config');


mongoose.connect(`${process.env.DB_config}` , { useNewUrlParser: true}, ()=>{
    console.log("connected To DB")
})



const PORT = process.env.PORT||5000;


//Middleware

app.use(express.static('public'));

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/',(req,res)=>{
    res.sendFile(__dirname+ '/public/NodeServer.html')
})
const emailRoute = require('./Routes/sendEmail')
app.use('/api', emailRoute);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})