const db = require('../models/index')

const createCategoryInfo = async (data) => {
    await db.Category.create({
        name: data.name
    });
}

module.exports = {
    createCategoryInfo,
}