
const Service = require('../Service');
const { registerService } = require('../registry');
const axios = require('axios');

class EmailService extends Service {
  constructor() {
    super('emails');
  }

  async sendEmail(config) {
    return axios.post('http://email_service:5002/email-service', config);
  }
}

registerService('emails', EmailService);

module.exports = EmailService;
