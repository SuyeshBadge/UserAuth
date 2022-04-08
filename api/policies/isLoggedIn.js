const { promisify } = require('util');
const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
  // 1) Getting token and check of it's there
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new Error('You are not logged in! Please log in to get access.')
      );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(
      token,
      sails.config.custom.JWT_SECRET
    );

    // 3) Check if user still exists
    const currentUser = await User.findOne({ id: decoded.id });
    if (!currentUser) {
      return next(
        new Error('The user belonging to this token does no longer exist.')
      );
    }

    // 4) Check if user changed password after the token was issued
    //   if (currentUser.changedPasswordAfter(decoded.iat)) {
    //     return next(
    //       new Error('User recently changed password! Please log in again.')
    //     );
    //   }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
    return;
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
