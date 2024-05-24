const express = require('express');
const shopController = require('../controllers/shopController');
const router = express.Router();

const initShopApiRoutes = (app) => {
    router.post('/shop/create', shopController.createShopInfo);
    router.get('/shop/read', shopController.readShopInfo);
    router.delete('/shop/delete/:shopId', shopController.deleteShopInfo);
    router.put('/shop/update', shopController.updateShopInfo);

    return app.use("/api/v1", router);
}

module.exports = initShopApiRoutes;