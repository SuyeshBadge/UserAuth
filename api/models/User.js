/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
      custom: function (value) {
        // • be a string
        // • be at least 6 characters long
        // • contain at least one number
        // • contain at least one letter
        return (
          _.isString(value) &&
          value.length >= 6 &&
          value.match(/[a-z]/i) &&
          value.match(/[0-9]/)
        );
      },
    },
    emailVerified: {
      type: 'Boolean',
      defaultsTo: false,
    },
    dob: {
      type: 'ref',
      // columnType: 'datetime',
      defaultsTo: 0,
    },
    gender: {
      type: 'string',
      isIn: ['M', 'F'],
    },
    emailOTP: {
      type: 'number',
    },
    resetToken: {
      type: 'string',
    }, passwordChangedAt: {
      type:'number'
    }
  },
  // customToJSON: function () {
  //   // Return a shallow copy of this record with the password and ssn removed.
  //   // this.createdAt = this.createdAt.toString();
  //   // return _.omit(this, ['password', 'email', 'id', 'emailVerified']);
  // },
};

