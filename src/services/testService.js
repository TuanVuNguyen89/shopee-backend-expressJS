const db = require('../models/index')

const addNewInfo = async (text) => {
    await db.Data.create({ data: text })
}

const getAllData = async () => {
    const data = await db.Data.findAll();

    try {
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
            DT: data
        }
    }
}

const deleteData = async (dataId) => {
    try {
        const data = await db.Data.findOne({
            where: { id: dataId }
        });

        if (data) {
            await data.destroy();

            return {
                EM: 'delete data success',
                EC: 0,
                DT: []
            }
        }
        else {
            return {
                EM: 'data is not exist',
                EC: 2,
                DT: []
            }
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
    addNewInfo,
    getAllData,
    deleteData
}