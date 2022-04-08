const bcrypt = require('bcrypt');
module.exports = {
  friendlyName: 'Create',

  description: 'Create user.',

  inputs: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    email: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    confirmPassword: {
      type: 'string',
      required: true,
    },
    gender: {
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'The user was created successfully',
    },
  },

  fn: async function (inputs) {
    // All done.
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
      //
      // eslint-disable-next-line no-unused-vars
      const user = await User.create({
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email.toLowerCase(),
        password: encryptedPassword,
        gender: inputs.gender,
      })
        .intercept('E_UNIQUE', (err) => {
          err.message = 'Email Already In Use';
          console.log(err.message);

          return err.message;
        })
        .fetch();
      return this.res.redirect('/verify-email');
    } catch (err) {
      return this.res.status(400).send(err.message);
    }
  },
};

