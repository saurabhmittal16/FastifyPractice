const authController = require('../controllers/auth');

const routes = [
    {
        method: 'POST',
        url: '/api/auth/login',
        handler: authController.login,
        schema: {
            body: {
                type: 'object',
                properties: {
                    username: {type: 'string'},
                    password: {type: 'string'}
                }
            }
        }
    },
    {
        method: 'POST',
        url: '/api/auth/signup',
        handler: authController.signup,
        schema: {
            body: {
                type: 'object',
                properties: {
                    username: {type: 'string'},
                    password: {type: 'string'}
                }
            }
        }
    },
];

module.exports = routes;