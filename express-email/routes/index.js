/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      callback(err);
      throw err;
    } else {
      console.log(html);
      callback(null, html);
    }
  });
};

/* GET home page. */
router.get('/', function (req, res) {
  res.render('/');
});

router.post('/', (req, res) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_URL,
      pass: process.env.FROM_PASS,
    },
  });

  readHTMLFile('./public/email.html', function (err, html) {
    var template = handlebars.compile(html);
    var replacements = {};
    var htmlToSend = template(replacements);
    let mailOptions = {
      from: process.env.FROM_URL,
      to: process.env.TO_URL,
      subject: 'Sending Email using Node.js',
      html: htmlToSend,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else {
        res.json({ result: true });
      }
    });
  });
});

module.exports = router;
