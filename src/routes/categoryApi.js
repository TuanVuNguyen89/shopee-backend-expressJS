const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();
const { checkUserJWT, checkUserPermission } = require('../middleware/JWTActions');

const initCategoryApiRoutes = (app) => {
    router.all('*', checkUserJWT, checkUserPermission);
    router.post('/category/create', categoryController.createCategoryInfo);

    return app.use("/api/v1", router);
}

module.exports = initCategoryApiRoutes;