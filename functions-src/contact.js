/* eslint-disable no-console */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const mailgun = require('mailgun-js');
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const successCode = 200;
const errorCode = 400;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = function(event, context, callback) {
  let data = JSON.parse(event.body);
  let { firstname, lastname, email, subject, message } = data;
  let mailOptions = {
    from: `${firstname} ${lastname} <${email}>`,
    to: 'chase@chaseohlson.com',
    replyTo: email,
    subject: `CO | ${subject}`,
    text: `${message}`,
  };

  mg.messages().send(mailOptions, (error, body) => {
    if (error) {
      console.log(error);
      callback(null, {
        statusCode: errorCode,
        headers,
        body: JSON.stringify(error),
      });
    } else {
      console.log(body);
      callback(null, {
        statusCode: successCode,
        headers,
        body: JSON.stringify(body),
      });
    }
  });
};
