const express = require('express');
const app = express();
const nodeMailer = require("nodemailer");

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
            user: 'parthkathurianode@gmail.com',
            pass: 'parthkathuria'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'parthkathuriaemails@gmail.com',
        subject: `Message from ${req.body.email}:  ${req.body.subject}`,
        text: req.body.message,
        html: `
        <h3 style="color: rgb(60, 176, 253); font-family: 'Times New Roman', Times, serif;">${req.body.name} Says: </h3> <br>
        <p style="font-size: 15px; color: black; font-family: 'Times New Roman', Times, serif;">${req.body.message}</p>
        `
    }

    let success ={
        message : "success"
    }
    let error ={
        message : "error"
    }

    transporter.sendMail(mailOptions, (err,success)=>{
        if(err){
            console.log(err);
            res.send(error)
        }else{
            console.log('email Sent', success);
            res.send(success)
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})