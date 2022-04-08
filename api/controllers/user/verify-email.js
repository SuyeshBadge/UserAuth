module.exports = {
  friendlyName: 'Verify email',

  description: '',

  inputs: {},

  exits: {},

  fn: async function () {
    try {
      const user = this.req.user;
      if (user.emailVerified) {
        return this.res.send('Email Already Verified');
      }
      const userMail = user.email;
      // const userMail = 'suyeshbadge@gmail.com';
      const subject = 'Verify Email';
      const sender = 'suyeshbadge@protonmail.com';

      const otp = Math.floor(1000 + Math.random() * 9000);

      const body = `Hi ${user.firstName},
  We just need to verify your email address before you can access the website.
  Verify your email address:
  Verification Code : ${otp}

    Thanks! – The Secure team`;
      await User.update({ email: user.email }).set({ emailOTP: otp });
      await sails.helpers.sendMail(userMail, sender, subject, body);
      return this.res.send('Email Sent Successfully');
    } catch (err) {
      return this.res.send(err.message);
    }
  },
};

