const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

const initProductApiRoutes = (app) => {
    router.post('/product/create', productController.createProductInfo);
    router.get('/product/read', productController.readProductInfo);
    return app.use("/api/v1", router);
}

module.exports = initProductApiRoutes;