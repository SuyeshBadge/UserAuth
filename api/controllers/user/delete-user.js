module.exports = {
  friendlyName: 'Delete user',

  description: '',

  inputs: {},

  exits: {},

  fn: async function () {
    await User.destroy({});
    // All done.
    return;
  },
};

