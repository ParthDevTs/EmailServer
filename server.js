const express = require('express');
const app = express();
const nodeMailer = require("nodemailer");
const cors = require("cors");
require('dotenv/config');

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
        subject: `"${req.body.name}"<${req.body.email}> sent you a message`,
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
        <br>
        <p style="color: blue;">To Reply, Click: <a target="_blank" href="mailto:${req.body.email}">${req.body.name}</a> </p>
        `
    }

    let successs ={
        message : "Email sent successfully"
    }
    let error ={
        message : "error"
    }

    transporter.sendMail(mailOptions, (err,success)=>{
        if(err){
            res.send(error)
        }else{
            res.send(successs)
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})