const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

const initCategoryApiRoutes = (app) => {
    router.post('/category/create', categoryController.createCategoryInfo);

    return app.use("/api/v1", router);
}

module.exports = initCategoryApiRoutes;