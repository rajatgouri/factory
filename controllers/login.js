const User = require('../model/user');
const config = require('../config');
const jwt = require('jsonwebtoken');

const JWT_TOKEN = config.jwt_token;


const errorResponses = {
    unauthorizedAccess: {status: {code: 401, error: 'Unauthorized Access!!'}},
    incompleteData: {status: {code: 500, error: 'Make sure the following fields were supplied'}},
    notRegistered: {status: {code: 403, error: 'User is not registered with us'}},
    alreadyRegistered: {status: {code: 403, error: 'User is not registered with us'}},
};

exports.getLogin = (req, res) => {
    res.render('login', {
        pageTitle: 'Login'
    })
}

exports.postLogin = (req,res) => {
    const email = req.body.username;
    const password = req.body.password;
    const user = new User( email, password);
    user.findByemail()
    .then(user => {
        if (user[0].length === 0) {
           res.send(errorResponses.notRegistered);
        } else {
            user = user[0][0];
            let token =  jwt.sign({user }, JWT_TOKEN);
            req.session.user = {
                user: user,
                date : new Date().getTime() + 8.64e+7
            }
            res.cookie('token', token  ,{ maxAge: 8.64e+7, httpOnly: true });
            res.cookie('user', user.name  ,{ maxAge: 8.64e+7, httpOnly: true });
            res.json({status: 
                {
                    code: 200, 
                    data: {
                        user: user.name,
                    }
                }
            });
        }
    })
    .catch(error => console.error(error));
}