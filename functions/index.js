const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const auth = require('./auth')


exports.helloWorld = functions.https.onRequest((req, res) => {
  console.log(req.method)
  res.send({
     messages: 'Hello World !',
     method: req.method,
     query: req.query,
     param: req.body,
     headers: req.headers
  });
});

exports.reportEmail = functions.https.onRequest((req, res) => {

  if(req.method !== "POST"){
    console.log(`Method：${req.method}`);
    return;
    res.send('404 Not Found');
  }

  const mailOptions = {
    from: '"Firebase Functions" <david.jian@myre.life>',
    to: req.body.targetMail,
    subject: req.body.subject,
    text: req.body.text,
    html: req.body.html
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // port: '25',
    // secure: false,
    auth: auth.gmail
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send({
        success: false,
        error: error,
      });
    } else {
      console.log(info);
      res.send({
        success: true,
        data: info
      });
    }

  });
})