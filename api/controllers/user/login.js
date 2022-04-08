const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signToken = (id) => {
  return jwt.sign({ id }, sails.config.custom.JWT_SECRET, {
    expiresIn: sails.config.custom.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        sails.config.custom.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (sails.config.custom.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  delete user.emailOTP;

  const date = new Date(user.dob * 1000);
  user.dob = date.toDateString('en-US');

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
module.exports = {
  friendlyName: 'Login',

  description: 'Login user.',

  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true,
    },
    password: { type: 'string', required: true },
  },

  exits: {},

  fn: async function (inputs) {
    // All done.
    // console.log(inputs.email, inputs.password);
    try {
      if (!inputs.email || !inputs.password) {
        throw new Error('Please enter the credentials');
      }
      const user = await User.findOne({ email: inputs.email.toLowerCase() });
      if (!user) {
        throw new Error('User not found');
      }
      // console.log(user);
      if (!bcrypt.compareSync(inputs.password, user.password)) {
        throw new Error('Invalid password');
      }
      //Every thing is fine now time to create jwt
      createSendToken(user, 200, this.res);
      // return this.res.send(user.firstName);
    } catch (err) {
      return this.res.status(400).send(err.message);
    }
  },
};

