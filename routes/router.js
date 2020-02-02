const router = require('express').Router();
const routes = [
    
    'login',
    'signup',
    'dashboard'
];

module.exports = {
    init: function () {
        routes.forEach((route) => {
            const definition = require(`./${route}`);
            router.use(definition.basePath, definition.router);
        });

        return router;
    }
};