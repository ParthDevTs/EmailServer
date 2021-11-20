
const express = require('express');
const router = express.Router();

require('dotenv/config');
const Email = require('../models/email');
const TotalCalls = require('../models/totalCalls');
const nodeMailer = require("nodemailer");


// Node Mailer API
router.post('/sendEmail',(req,res)=>{
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
            const hits = await TotalCalls.find({
                _id: "619774c3f75d55dcf1d7d4f1"
            })
            let totalHits = hits[0].hits;
            let updatedHits = totalHits+1;
            TotalCalls.updateOne({ hits : totalHits }, { hits : updatedHits }, (err,res)=>{
                if(err){
                    console.log(err);
                }
            } );
            try{
                const emailSaved = await email.save(); 
            }
            catch(err){
                console.log({"error": "Email Already Exists"})
            }
        }
    })
});


//Email Stats API
router.get('/getEmailStats', async (req,res)=>{

   try{
       const emails = await Email.find();
       const hits = await TotalCalls.find({
           _id: "619774c3f75d55dcf1d7d4f1"
       })

       let ctr =0;
       emails.forEach(email=>{
            ctr++;
       });
       res.json({
           totalEmails: ctr,
           hits: hits[0].hits +1
        });
   }catch(err){
     
   }
})


// Export File
module.exports= router;