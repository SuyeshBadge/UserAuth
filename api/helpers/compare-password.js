const bcrypt = require('bcrypt');
module.exports = {
  friendlyName: 'Compare password',

  description: '',

  inputs: {
    password: {
      type: 'string',
      required: true,
    },
    confirmPassword: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    try {
      if (
        !inputs.password ||
        !inputs.confirmPassword ||
        inputs.password !== inputs.confirmPassword
      ) {
        return { err: ['Password does not match confirmation'] };
      }
      // Hash password
      const encryptedPassword = bcrypt.hashSync(inputs.password, 10);
      return encryptedPassword;
    } catch (err) {
      return this.res.send(err.message);
    }
  },
};

