require('dotenv').config();
const db = require('../models/index')
const { createJWT, verifyToken } = require('../middleware/JWTActions');

const addNewInfo = async (data) => {
    await db.Product_image.create({
        productId: data.productId,
        image: data.image
    })
}

const getAllData = async () => {
    const data = await db.Product_image.findAll();

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

const handleLogin = async (rawUserData) => {
    try {
        if (rawUserData.valueLogin === process.env.ACCOUNT && rawUserData.password === process.env.PASSWORD) {
            // test roles
            let roles = await getRoles();
            let payload = roles;

            let token = createJWT(payload);

            return {
                EM: 'success',
                EC: 0,
                DT: {
                    access_token: token,
                    data: roles
                }
            }
        }

        //console.log(">>> Not found user with email/phone: ", rawUserData.valueLogin, "password: ", rawUserData.password);
        return {
            EM: 'Your account or password is incorrect.',
            EC: -1,
            DT: ''
        }
    }
    catch (error) {
        console.log(error);
        return {
            EM: 'Something is wrong in service...',
            EC: -2,
            DT: ''
        }
    }
}

const getRoles = async () => {
    try {
        const data = await db.Role.findAll();

        return {
            EM: 'get all roles success',
            EC: 0,
            DT: data
        }
    }
    catch (e) {
        console.log(e);

        return {
            EM: 'Something wrongs with the services',
            EC: -1,
            DT: []
        }
    }
}

module.exports = {
    addNewInfo,
    getAllData,
    deleteData,
    handleLogin
}