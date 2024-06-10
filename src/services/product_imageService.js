const db = require('../models/index')

const createProduct_ImageInfo = async (data) => {
    //console.log("data from client", data);
    await db.Product_image.bulkCreate(data);
}

module.exports = {
    createProduct_ImageInfo,
}