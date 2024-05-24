const db = require('../models/index')

const createShopInfo = async (data) => {
    await db.Shop.create({
        name: data.name, logo: data.logo, background: data.background,
        description: data.description, contact: data.contact, phone: data.phone, page: data.page, address: data.address
    });
}

const readShopInfo = async () => {
    const data = await db.Shop.findAll();

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

const deleteShopInfo = async (ShopId) => {
    try {
        const data = await db.Shop.findOne({
            where: { id: ShopId }
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

const updateShopInfo = async (data) => {
    try {
        if (!data.name || !data.logo || !data.background || !data.description || !data.contact || !data.phone || !data.page || !data.address) {
            let parameters = '';
            if (!data.name) parameters = 'name';
            else if (!data.logo) parameters = 'logo';
            else if (!data.background) parameters = 'background';
            else if (!data.description) parameters = 'description';
            else if (!data.contact) parameters = 'contact';
            else if (!data.phone) parameters = 'phone';
            else if (!data.page) parameters = 'page';
            else if (!data.address) parameters = 'address';

            return {
                EM: `Error with empty ${parameters}`,
                EC: 1,
                DT: ''
            }
        }

        let shop = await db.Shop.findOne({
            where: { id: data.id }
        });

        //console.log(">>> check data here: ", data);
        if (shop) {
            await shop.update({
                name: data.name,
                logo: data.logo,
                background: data.background,
                description: data.description,
                contact: data.contact,
                phone: data.phone,
                page: data.page,
                address: data.address
            });

            return {
                EM: 'update user success',
                EC: 0,
                DT: ''
            }
        }
        else {
            // not found
            return {
                EM: 'user not found',
                EC: 2,
                DT: ''
            }
        }
    }
    catch (e) {
        console.log(e);

        return {
            EM: 'something wrongs with the services',
            EC: -1,
            DT: ''
        }
    }
}

module.exports = {
    createShopInfo,
    readShopInfo,
    deleteShopInfo,
    updateShopInfo
}