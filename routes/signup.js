const router = require('express').Router();
const signupController  = require('../controllers/signup');


router.get('/signup', signupController.getSignup);

router.post('/signup', signupController.postSignup);


module.exports = {
  router: router,
  basePath: '/'
};
