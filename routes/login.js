const router = require('express').Router();
const loginController  = require('../controllers/login');
const sessionChecking = require('../middleware/sessionChecking') 

router.get('/login', loginController.getLogin);

router.post('/login', loginController.postLogin);


module.exports = {
  router: router,
  basePath: '/'
};
