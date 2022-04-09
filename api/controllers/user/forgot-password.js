const crypto = require('crypto');

module.exports = {
  friendlyName: 'Forgot password',

  description: '',

  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true,
    },
  },

  exits: {},

  fn: async function (inputs) {
    // All done.
    try {
      const user = await User.findOne({ email: inputs.email.toLowerCase() });
      if (!user) {
        throw new Error('No User Registered with this email');
      }
      const hash = crypto.randomBytes(32).toString('hex');
      // console.log(`hash`);
      const resetURL = `${this.req.protocol}://${this.req.hostname}/reset-password?token=${hash}`;
      const sender = 'suyeshbadge@protonmail.com';
      const userMail = user.email;
      const subject = 'Forgot Password';
      const body = `Hi ${user.firstName},

Need to reset your password?
Use your secret code!
${resetURL}

If you did not forget your password, you can ignore this email.

The Secure Team.
      `;
      await User.update({ email: user.email.toLowerCase() }).set({
        resetToken: hash,
      });
      await sails.helpers.sendMail(userMail, sender, subject, body);
      return this.res.send('Email sent to your registered Email Address.');
    } catch (err) {
      return this.res.send(err.message);
    }
  },
};

