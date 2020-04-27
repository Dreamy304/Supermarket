const nodemailer = require('nodemailer');

const emailCred={
    username:'supermarket.system.mail@gmail.com',
    password:'MessaihEster'
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailCred.username,
      pass: emailCred.password
    }
  });

const sendEmail=(receiver,subject,body)=>{
    var mailOptions = {
        from: email.username,
        to: receiver,
        subject: subject,
        html: body
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

const email={
    sendEmail
}

module.exports={
    email
}