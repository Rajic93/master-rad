
const express = require('express');
const server = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const mailer = require('./src/mailer');

const port = 5002;

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
// server.use('/', logger);

server.use((req, res, next) => {
  try {
    if (req.url !== '/email-service') {
      return res.status(403).send('Unknown resource requested!');
    }
    next();
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

server.post('/email-service', async (
  {
    body: {
      sender,
      recipient,
      subject,
      content,
    },
  },
  res,
) => {
  try {
    await mailer.sendEmail({
      sender,
      recipient,
      subject,
      content,
    });
    return res.status(200).send('Email sent successfully.');
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

server.listen(port, () => console.log(`Email server is up and running at port ${port}`));


