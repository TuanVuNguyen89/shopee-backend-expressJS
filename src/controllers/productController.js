const productService = require('../services/productService');

const createProductInfo = async (req, res) => {
    try {
        if (!req.body.name || !req.body.image || !req.body.price ||
            !req.body.categoryId) {
            let ER_M = '';
            if (!req.body.name) ER_M = 'name';
            else if (!req.body.image) ER_M = 'image';
            else if (!req.body.price) ER_M = 'price';
            else if (!req.body.categoryId) ER_M = 'category';

            return res.status(200).json({
                EM: `missing required ${ER_M}`, // error message
                EC: -1, // error code,
                DT: '', // data
            });
        }

        productService.createProductInfo(req.body);
        return res.status(200).json({
            EM: 'create product info success', // error message
            EC: 1, // error code,
            DT: req.body, // data
        });
    }
    catch (e) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code,
            DT: '', // data
        })
    }
}

const readProductInfo = async (req, res) => {
    try {
        const products = await productService.readAllProductInfo();
        return res.status(200).json({
            EM: 'get all product info success', // error message
            EC: 1, // error code,
            DT: products, // data
        });
    }
    catch (e) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code,
            DT: '', // data
        })
    }
}

module.exports = {
    createProductInfo,
    readProductInfo
}