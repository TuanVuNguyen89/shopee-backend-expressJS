const { Buffer } = require('buffer');
const shopService = require('../services/shopService');

const convertToBase64 = (image) => {
    if (image)
        return `data:${image.mimetype};base64,${image.buffer.toString('base64')}`

    return null;
}

const createShopInfo = async (req, res) => {
    //console.log(req.body);
    // const logo = req.files.logo ? req.files.logo[0] : null;
    // const background = req.files.background ? req.files.background[0] : null;
    try {
        const { name, description, contact, phone, page, address } = req.body;
        const logo = req.files.logo ? req.files.logo[0] : null;
        const background = req.files.background ? req.files.background[0] : null;

        if (!logo || !name || !background
            || !description || !contact || !phone
            || !page || !address
        ) {
            let ER_M = '';
            if (!logo) ER_M = 'logo';
            else if (!name) ER_M = 'name';
            else if (!background) ER_M = 'background';
            else if (!description) ER_M = 'description';
            else if (!contact) ER_M = 'contact';
            else if (!phone) ER_M = 'phone';
            else if (!page) ER_M = 'page';
            else if (!address) ER_M = 'address';

            return res.status(200).json({
                EM: `missing required ${ER_M}`, // error message
                EC: -1, // error code,
                DT: '', // data
            });
        }

        const shopData = {
            name, logo: convertToBase64(logo), background: convertToBase64(background),
            description, contact, phone, page, address
        }

        shopService.createShopInfo(shopData);
        return res.status(200).json({
            EM: 'create shop info success', // error message
            EC: 0, // error code,
            DT: shopData, // data
        });
    }
    catch (e) {
        console.log("error in here", e);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code,
            DT: '', // data
        })
    }
}

const readShopInfo = async (req, res) => {
    try {
        let data = await shopService.readShopInfo();

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
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

const deleteShopInfo = async (req, res) => {
    try {
        //console.log(">>> check req params ", req.params);
        let data = await shopService.deleteShopInfo(req.params.shopId);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
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

const updateShopInfo = async (req, res) => {
    try {
        //console.log(req.body);
        let data = await shopService.updateShopInfo(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    }
    catch (e) {
        console.log(e);

        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: ''
        });
    }
}

module.exports = {
    createShopInfo,
    readShopInfo,
    deleteShopInfo,
    updateShopInfo
}