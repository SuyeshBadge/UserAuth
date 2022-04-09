/* eslint-disable no-unused-vars */
module.exports = {
  friendlyName: 'Send mail',

  description: '',

  inputs: {
    recipient: {
      type: 'string',
      required: true,
    },
    sender: {
      type: 'string',
      required: true,
    },
    subject: {
      type: 'string',
    },
    textBody: {
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    //3854174
    /**
     *
     * This call sends a message to the given recipient with vars and custom vars.
     *
     */
    /**
     *
     * This call sends a message to one recipient.
     *
     */
    const mailjet = require('node-mailjet').connect(
      sails.config.custom.MJ_APIKEY_PUBLIC,
      sails.config.custom.MJ_APIKEY_PRIVATE
    );
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: inputs.sender,
            Name: 'User Auth',
          },
          To: [
            {
              Email: inputs.recipient,
              // Name: ' suyesh',
            },
          ],
          Subject: inputs.subject,
          TextPart: inputs.textBody,
        },
      ],
    });
    request
      .then((_result) => {
        // console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  },
};

/*

Hi [name],

We just need to verify your email address before you can access [customer portal].

Verify your email address [verification link]

Thanks! – The [company] team

*/

