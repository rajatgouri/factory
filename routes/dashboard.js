const router = require('express').Router();
const dashboardController  = require('../controllers/dashboard');

router.get('/dashboard', dashboardController.getDashboard);

module.exports = {
  router: router,
  basePath: '/'
};
