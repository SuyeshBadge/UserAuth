module.exports = {
  friendlyName: 'Get user',

  description: '',

  inputs: {
    id: {
      type: 'number',
    },
  },

  exits: {},

  fn: async function (inputs) {
    try {
      const user = await User.findOne({ id: inputs.id });
      // All done.
      // console.log(user);
      if (!user) {
        throw Error('User Not Found');
      }
      delete user.password;
      return this.res.send(user);
    } catch (err) {
      return this.res.status(400).send(err.message);
    }
  },
};

