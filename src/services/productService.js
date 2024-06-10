const db = require('../models/index')
const { createProduct_ImageInfo } = require('./product_imageService');

const createProductInfo = async (data) => {
    await db.Product.create({
        name: data.name, image: data.mainImage, price: data.price,
        categoryId: data.categoryId, description: data.description
    });

    const product = await readProductInfo(data);

    //console.log("this is product", product.DT);
    const updatedImage = data.image.map((image) => ({
        image: image,
        productId: product.DT.id
    }));

    await createProduct_ImageInfo(updatedImage);
}

const editProductInfo = async (data) => {
    let product = await db.Product.findOne({
        where: { id: data.id }
    });

    //console.log(">>> check data here: ", data);
    if (product) {
        await product.update({
            name: data.name,
            price: data.price,
            categoryId: data.categoryId,
            image: data.mainImage,
            description: data.description
        });

        await db.Product_image.destroy({
            where: { productId: +data.id }
        })

        let updated_data = data.image.map((image, index) => {
            let cur_data = {
                image: image,
                productId: +data.id
            }

            return cur_data;
        });

        //console.log(">>> updated_data", updated_data);
        await db.Product_image.bulkCreate(updated_data);

        return {
            EM: 'update product success',
            EC: 0,
            DT: ''
        }
    }
    else {
        // not found
        return {
            EM: 'product not found',
            EC: 2,
            DT: ''
        }
    }
}

const readProductInfo = async (data) => {
    const product = await db.Product.findOne({
        where: {
            name: data.name, image: data.mainImage,
            price: data.price, categoryId: data.categoryId,
            description: data.description
        },
        raw: true
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

const readProductById = async (id) => {
    const product = await db.Product.findOne({
        where: { id: id },
    });

    //console.log(product);
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

const readProductWithPagination = async (page, limit, type) => {
    //console.log(">>> check page & limit & type", page, limit, type);

    try {
        let offset = (page - 1) * limit;
        let data;

        if (type) {
            let { count, rows } = await db.Product.findAndCountAll({
                offset: offset,
                limit: limit,
                where: { categoryId: type }
            });

            //console.log(">>> check count: ", count);
            //console.log(">>> check rows: ", rows);

            let totalPages = Math.ceil(count / limit);
            data = {
                totalRow: count,
                totalPages: totalPages,
                products: rows
            }
        }
        else {
            let { count, rows } = await db.Product.findAndCountAll({
                offset: offset,
                limit: limit
            });

            //console.log(">>> check count: ", count);
            //console.log(">>> check rows: ", rows);

            let totalPages = Math.ceil(count / limit);
            data = {
                totalRow: count,
                totalPages: totalPages,
                products: rows
            }
        }

        return {
            EM: 'get data success',
            EC: 0,
            DT: data
        }
    }
    catch (e) {
        console.log(e);

        return {
            EM: 'something wrongs with services',
            EC: -1,
            DT: []
        }
    }
}

const readImageInfoWithId = async (id) => {
    try {
        const data = await db.Product_image.findAll({
            where: { productId: id }
        })

        return {
            EM: 'get data success',
            EC: 0,
            DT: data
        }
    }
    catch (e) {
        console.log(e);

        return {
            EM: 'something wrongs with services',
            EC: -1,
            DT: []
        }
    }
}

const deleteProduct = async (id) => {
    try {
        await db.Product.destroy({ where: { id } })
        await db.Product_image.destroy({ where: { productId: id } });

        return {
            EM: 'delete data success',
            EC: 0,
            DT: []
        }
    }
    catch (e) {
        return {
            EM: 'error from server',
            EC: -1,
            DT: []
        }
    }
}

module.exports = {
    createProductInfo,
    readProductInfo,
    readAllProductInfo,
    readProductWithPagination,
    readProductById,
    readImageInfoWithId,
    editProductInfo,
    deleteProduct
}