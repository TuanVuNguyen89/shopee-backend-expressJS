const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();
const { checkUserJWT, checkUserPermission } = require('../middleware/JWTActions');

const initApiRoutes = (app) => {
    router.all('*', checkUserJWT, checkUserPermission);
    router.post('/login', loginController.handleLogin);
    router.get('/account', loginController.handleAccount)
    router.post('/logout', loginController.handleLogout);

    return app.use("/api/v1", router);
}

module.exports = initApiRoutes;