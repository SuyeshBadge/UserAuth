module.exports = {
  friendlyName: 'Get all users',

  description: '',

  inputs: {},

  exits: {},

  fn: async function () {
    // All done.
    const Users = await User.find({
      select: ['firstName', 'lastName'],
    });
    Users.forEach((u) => {
      delete u.id;
    });
    sails.log.debug(Users);
    return this.res.json(Users);
  },
};

