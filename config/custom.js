/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {
  /***************************************************************************
   *                                                                          *
   * Any other custom config this Sails app should use during development.    *
   *                                                                          *
   ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN, //days
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN, //secs
  NODE_ENV: process.env.NODE_ENV,

  //MailJet creds
  MJ_APIKEY_PUBLIC: process.env.MJ_APIKEY_PUBLIC,
  MJ_APIKEY_PRIVATE: process.env.MJ_APIKEY_PRIVATE,
};

