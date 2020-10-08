const sgMail = require('@sendgrid/mail');

const from = process.env.SENDGRID_FROM;


class EmailService {
  static async send(config) {
    try {
      const message = {
        from,
        ...config,
      };
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      await sgMail
        .send(message);

      return 1;
    } catch (error) {
      console.error(error.response.body)
      return -1;
    }
  }

  static async accountActivation(email, name, token, templateId) {
    const config = {
      template_id: templateId,
      personalizations: [
        {
          to: [{
            email,
            name,
          }],
          dynamic_template_data: { activationLink: token },
          subject: 'Successful registration'
        }
      ]
    };

    return this.send(config);
  }

  static async accountDeactivation(email, name, token, templateId) {
    const config = {
      template_id: templateId,
      personalizations: [
        {
          to: [{
            email,
            name,
          }],
          dynamic_template_data: { activationLink: token },
          subject: 'Account deactivated'
        }
      ]
    };

    return this.send(config);
  }
}

module.exports = EmailService;
