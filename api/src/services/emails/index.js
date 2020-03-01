
const Service = require('../Service');
const serviceRegistry = require('../ServiceRegistry');
const axios = require('axios');

class EmailService extends Service {
  constructor() {
    super('emails');
  }

  async sendEmail(config) {
    const options = { headers: { alx_master_app: 'alx_api' } };
    return axios.post('http://email_service:5002/email-service', config, options);
  }
}

serviceRegistry.registerService('emails', EmailService);

module.exports = EmailService;
