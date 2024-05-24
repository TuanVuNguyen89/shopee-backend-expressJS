const categoryService = require('../services/categoryService');

const createCategoryInfo = async (req, res) => {
    try {
        if (!req.body.name) {
            let ER_M = '';
            if (!req.body.name) ER_M = 'name';

            return res.status(200).json({
                EM: `missing required ${ER_M}`, // error message
                EC: -1, // error code,
                DT: '', // data
            });
        }

        categoryService.createCategoryInfo(req.body);
        return res.status(200).json({
            EM: 'create category info success', // error message
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

module.exports = {
    createCategoryInfo,
}