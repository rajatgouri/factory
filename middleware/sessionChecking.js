"use strict";

var errorResponses = {
    unauthorizedAccess: {status: {code: 403, error: 'Unauthorized Access!!'}},
};


var sessionCheck = function (req, res, next) {
  if (req.cookies.session) {
    if (req.session.user) {
      let expiresIn = req.session.user.date;
      let date = new Date();
      if( new Date(date).getTime() > new Date(expiresIn).getTime() ) {
        console.log('session expires');
        console.log('redirect to login');

        next();
      } else {
        console.log('session left')
        console.log('redirect to dashboard , not implemented yet!');
        next()
      }
    } else {
        next()
    }
  } else {
    next()
  }
    
}

module.exports = sessionCheck;