const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const multer = require('multer');
const { checkUserJWT, checkUserPermission } = require('../middleware/JWTActions');

const upload = multer({ storage: multer.memoryStorage() });
const initProductApiRoutes = (app) => {
    router.all('*', checkUserJWT, checkUserPermission);
    router.post('/product/create', upload.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'image', maxCount: 20 }
    ]), productController.createProductInfo);
    //router.post('/product/create', productController.createProductInfo);
    router.get('/product/read', productController.readAllProductInfo);
    router.post('/product/read', productController.readProductInfo);
    router.post('/product/image/read', productController.readImageInfoWithId);
    router.put('/product/edit', upload.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'image', maxCount: 20 }
    ]), productController.editProductInfo);
    router.delete('/product/delete/:id', productController.deleteProduct);
    return app.use("/api/v1", router);
}

module.exports = initProductApiRoutes;