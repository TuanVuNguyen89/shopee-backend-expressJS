const { Buffer } = require('buffer');
const productService = require('../services/productService');

const convertToBase64 = (image) => {
    if (image)
        return `data:${image.mimetype};base64,${image.buffer.toString('base64')}`

    return null;
}

const createProductInfo = async (req, res) => {
    try {
        const body = req.body._data;
        const name = body.name;
        const price = body.price;
        const categoryId = body.categoryId;
        const description = body.description;
        const mainImage = body.mainImage;
        const image = body.image;

        if (!name || !mainImage || !price ||
            !categoryId) {
            let ER_M = '';
            if (!name) ER_M = 'name';
            else if (!mainImage) ER_M = 'mainImage';
            else if (!price) ER_M = 'price';
            else if (!categoryId) ER_M = 'category';

            return res.status(200).json({
                EM: `missing required ${ER_M}`, // error message
                EC: -1, // error code,
                DT: '', // data
            });
        }

        //console.log("mainImage", mainImage);
        //console.log("image", image);

        const data = {
            name, price, categoryId, mainImage, image, description
        }
        productService.createProductInfo(data);

        return res.status(200).json({
            EM: 'create product info success', // error message
            EC: 0, // error code,
            DT: data, // data
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code,
            DT: '', // data
        })
    }
}

const editProductInfo = async (req, res) => {
    //console.log("req.body in edit product", req.body.data);
    try {
        const { id, name, price, categoryId, description, image } = req.body.data;

        if (!name || !price || !image || !categoryId) {
            let missingField = '';
            if (!name) missingField = 'name';
            else if (!image) missingField = 'image';
            else if (!price) missingField = 'price';
            else if (!categoryId) missingField = 'category';

            return res.status(200).json({
                EM: `missing required ${missingField}`, // error message
                EC: -1, // error code
                DT: '', // data
            });
        }

        const data = { id, name, price, categoryId, mainImage: image[0], image, description };
        await productService.editProductInfo(data);

        return res.status(200).json({
            EM: 'edit product info success', // error message
            EC: 0, // error code
            DT: data, // data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: -1, // error code
            DT: '', // data
        });
    }
};

const readAllProductInfo = async (req, res) => {
    try {
        //console.log(">>> check query", req.query);
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let type = req.query.type;

            const products = await productService.readProductWithPagination(+page, +limit, +type);
            return res.status(200).json({
                EM: 'get product with pagination success', // error message
                EC: 1, // error code,
                DT: products, // data
            });
        }
        else {
            //console.log("haha");
            const products = await productService.readAllProductInfo();
            return res.status(200).json({
                EM: 'get all product info success', // error message
                EC: 1, // error code,
                DT: products, // data
            });
        }
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
    //console.log(">>> check req", req.body);
    try {
        //console.log(">>> check query", req.query);
        let id = req.body.id;

        const products = await productService.readProductById(+id);
        return res.status(200).json({
            EM: 'get product success', // error message
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

const readImageInfoWithId = async (req, res) => {
    try {
        //console.log(">>> check query", req.query);
        let id = req.body.id;

        const images = await productService.readImageInfoWithId(+id);
        return res.status(200).json({
            EM: 'get image success', // error message
            EC: 0, // error code,
            DT: images, // data
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

const deleteProduct = async (req, res) => {
    try {
        //console.log(req.params);
        productService.deleteProduct(req.params.id);

        return res.status(200).json({
            EM: 'delete product success', // error message
            EC: 0, // error code,
            DT: [], // data
        });
    }
    catch (e) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: 1, // error code,
            DT: [], // data
        });
    }
};

module.exports = {
    createProductInfo,
    readAllProductInfo,
    readProductInfo,
    readImageInfoWithId,
    editProductInfo,
    deleteProduct
}