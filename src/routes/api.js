const express = require('express');
const testController = require('../controllers/testController');
const router = express.Router();
const { checkUserJWT, checkUserPermission } = require('../middleware/JWTActions');

const initApiRoutes = (app) => {
    router.all('*', checkUserJWT, checkUserPermission);
    router.post('/test', testController.handleSaveInfo);
    router.get('/test', testController.showSaveInfo);
    router.delete('/test/:dataId', testController.deleteData);

    return app.use("/api/v1", router);
}

module.exports = initApiRoutes;