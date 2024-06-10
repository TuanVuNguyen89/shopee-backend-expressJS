const express = require('express');
const shopController = require('../controllers/shopController');
const router = express.Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });
const { checkUserJWT, checkUserPermission } = require('../middleware/JWTActions');

const initShopApiRoutes = (app) => {
    router.all('*', checkUserJWT, checkUserPermission);
    router.post('/shop/create', upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'background', maxCount: 1 }
    ]), shopController.createShopInfo);

    router.get('/shop/read', shopController.readShopInfo);
    router.delete('/shop/delete/:shopId', shopController.deleteShopInfo);
    router.put('/shop/update', shopController.updateShopInfo);

    return app.use("/api/v1", router);
}

module.exports = initShopApiRoutes;