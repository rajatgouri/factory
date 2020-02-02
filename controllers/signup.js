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


exports.getSignup = (req, res) => {
    res.render('signup', {
        pageTitle: 'signup'
    })
}

exports.postSignup = (req,res) => {
    const email = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const phone = req.body.phone;
    const country = req.body.country;
    const state = req.body.state;

    const user = new User( email, password, name, phone, country, state);
    user.findByemail()
    .then(user => {
        if (user[0].length === 0) {
            return true
        } else {
           return res.send(errorResponses.notRegistered);
        }
    })
    .then(result => {
        return user.save();
    })
    .then(data => {
       return user.findByemail()
    })
    .then(user => {
        if (user[0].length !== 0) {
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
        } else {
            console.log('unexectly user not found in signup');
        }
    })
    .catch(error => console.error(error));
}


// user.save()
// .then(data => {
//     console.log(data);
// })
// .catch(error => console.error(error));