const db = require('../models/index')
const { createProduct_ImageInfo } = require('./product_imageService');

const createProductInfo = async (data) => {
    await db.Product.create({
        name: data.name, image: data.image, price: data.price,
        categoryId: data.categoryId
    });

    const product = await readProductInfo(data);
    await createProduct_ImageInfo({ image: data.image, productId: product.id });
}

const readProductInfo = async (data) => {
    const product = await db.Product.findOne({
        where: { name: data.name, image: data.image, price: data.price, categoryId: data.categoryId },
    });

    try {
        return {
            EM: 'get data success',
            EC: 0,
            DT: product
        }
    }
    catch (e) {
        console.log(e);

        return {
            EM: 'something wrongs with services',
            EC: -1,
            DT: data
        }
    }
}

const readAllProductInfo = async (data) => {
    const products = await db.Product.findAll();

    try {
        return {
            EM: 'get data success',
            EC: 0,
            DT: products
        }
    }
    catch (e) {
        console.log(e);

        return {
            EM: 'something wrongs with services',
            EC: -1,
            DT: data
        }
    }
}

module.exports = {
    createProductInfo,
    readProductInfo,
    readAllProductInfo
}