module.exports = {
  friendlyName: 'Confirm email',

  description: '',

  inputs: {
    otp: {
      type: 'number',
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs) {
    // All done.
    try {
      const user = this.req.user;
      if (inputs.otp === user.emailOTP) {
        await User.update({ email: user.email }).set({
          emailVerified: true,
          emailOTP: 0,
        });
      } else {
        throw new Error('Invalid OTP');
      }

      return this.res.send('Email Verified');
    } catch (err) {
      return this.res.send(err.message);
    }
  },
};

