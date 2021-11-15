const express = require('express');
const app = express();
const nodeMailer = require("nodemailer");
const mongoose = require("mongoose");
require('dotenv/config');
const Email = require('../EmailServer/models/email');

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
app.post('/api/sendEmail',(req,res)=>{

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    })

    const mailOptions = {
        from: `"${req.body.name}"  <${req.body.email}>`,
        to: 'parthkathuriaemails@gmail.com',
        replyTo: req.body.email ,
        subject: `${req.body.subject}`,
        text: req.body.message,
        html: `
        <p>You have a new contact request!</p>
        <br>
        <h3>Contact Details: </h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email Id: ${req.body.email}</li>
            <li>Subject: ${req.body.subject}</li>
        </ul>
        <h3>Message: </h3>
        <p>${req.body.message}</p>
        `
    }

    const email = new Email({
        name: req.body.name,
        email: req.body.email
    })

    let successs ={
        message : "Email sent successfully"
    }
    let error ={
        message : "error"
    }


    transporter.sendMail(mailOptions, async (err,success)=>{
        if(err){
            res.send(error)
        }else{
            res.send(successs)
            try{
                const emailSaved = await email.save(); 
            }
            catch(err){
                console.log(error)
            }
        }
    })


})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})