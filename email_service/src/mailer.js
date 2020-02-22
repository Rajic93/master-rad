
const mailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const service = process.env.EMAIL_PROVIDER || 'gmail';
const user = process.env.EMAIL_USER || 'aleksandar.v.rajic@gmail.com';
const pass = process.env.EMAIL_PASSWORD || 'Aleksandar@1993';

const DEFAULT_CONFIG = {
  service,
  auth: {
    user,
    pass,
  }
};

const configureMailer = options => {
  if (!options.sender || !options.recipient) {
    throw new Error('Invalid sender or recipient.');
  }
  const resolvedOptions = {
    from: options.sender,
    to: options.recipient,
    subject: options.subject,
    html: options.content,
  };
  const transporter = mailer.createTransport(DEFAULT_CONFIG);
  return {
    options: resolvedOptions,
    transporter,
  };
};

module.exports = {
  sendEmail: config => {
    const {
      options,
      transporter,
    } = configureMailer(config);

    return new Promise((resolve, reject) => transporter
      .sendMail(options, (mailError, info) => {
        try {
          if (mailError) {
            throw new Error(mailError.toString());
          }
          resolve(info.response);
        } catch (error) {
          reject(error.toString());
        }
      }))
  },
};
