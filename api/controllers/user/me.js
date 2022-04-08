module.exports = {
  friendlyName: 'Me',

  description: 'Me user.',

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    console.log(inputs);
    // All done.
    // console.log(this.req.user);
    const user = this.req.user;
    delete user.password;
    delete user.id;
    delete user.emailOTP;
    const date = new Date(user.dob * 1000);
    user.dob = date.toDateString('en-US');

    return this.res.send(user);
  },
};

