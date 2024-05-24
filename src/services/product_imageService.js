const db = require('../models/index')

const createProduct_ImageInfo = async (data) => {
    await db.Product_image.create({
        image: data.image,
        productId: data.productId
    });
}

module.exports = {
    createProduct_ImageInfo,
}