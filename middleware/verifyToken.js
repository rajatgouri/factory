"use strict";

var errorResponses = {
    unauthorizedAccess: {status: {code: 403, error: 'Unauthorized Access!!'}},
};


var verifyToken = function (req, res, next) {
    var bearerHeaders = req.headers['authorization'];
    console.log(bearerHeaders)
    if(bearerHeaders) {
        var bearer = bearerHeaders.split(' ');
        var bearerToken = bearer[1];
        req.token = bearerToken;
        next()
        
    } else {
        res.json(errorResponses.unauthorizedAccess);
    }
}

module.exports = verifyToken;