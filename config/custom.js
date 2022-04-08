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
  JWT_SECRET: 'qcxVtRrAAnh5yBwksBrnZ33ruM39xb6C',
  JWT_COOKIE_EXPIRES_IN: 60, //days
  JWT_EXPIRES_IN: 300, //secs
  NODE_ENV: 'development',

  //MailJet creds
  MJ_APIKEY_PUBLIC: 'ad2f9d1bcb4e01ada47d7d6436b2ca0d',
  MJ_APIKEY_PRIVATE: 'e995bbffe00db8742f2836e12d93fcf9',
};

