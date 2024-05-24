const shopService = require('../services/shopService');

const createShopInfo = async (req, res) => {
    try {
        if (!req.body.logo || !req.body.name || !req.body.background
            || !req.body.description || !req.body.contact || !req.body.phone
            || !req.body.page || !req.body.address
        ) {
            let ER_M = '';
            if (!req.body.logo) ER_M = 'logo';
            else if (!req.body.name) ER_M = 'name';
            else if (!req.body.background) ER_M = 'background';
            else if (!req.body.description) ER_M = 'description';
            else if (!req.body.contact) ER_M = 'contact';
            else if (!req.body.phone) ER_M = 'phone';
            else if (!req.body.page) ER_M = 'page';
            else if (!req.body.address) ER_M = 'address';

            return res.status(200).json({
                EM: `missing required ${ER_M}`, // error message
                EC: -1, // error code,
                DT: '', // data
            });
        }

        shopService.createShopInfo(req.body);
        return res.status(200).json({
            EM: 'create shop info success', // error message
            EC: 1, // error code,
            DT: req.body, // data
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