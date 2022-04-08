module.exports = {
  friendlyName: 'Reset password',

  description: '',

  inputs: {
    token: {
      type: 'string',
    },
    newPass: {
      type: 'string',
    },
    confirmPass: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function (inputs) {
    try {
      const token = inputs.token;
      const user = await User.findOne({ resetToken: token });
      const time = Date.now();
      console.log(time);
      if (!user) {
        throw new Error('Invalid Token');
      }
      const encryptedPassword = await sails.helpers.comparePassword(
        inputs.newPass,
        inputs.confirmPass
      );

      await User.update({ email: user.email }).set({
        password: encryptedPassword,
        resetToken: 'null',
        passwordChangedAt: time,
      });
      return this.res.send('Password Changed Successfully');
    } catch (err) {
      return this.res.send(err.message, 500);
    }
  },
};

