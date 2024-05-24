const testService = require('../services/testService');

const handleSaveInfo = async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(200).json({
                EM: 'missing required parameters', // error message
                EC: '-1', // error code,
                DT: '', // data
            });
        }

        testService.addNewInfo(req.body.text);
        return res.status(200).json({
            EM: req.body.text, // error message
            EC: 1, // error code,
            DT: '', // data
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

const showSaveInfo = async (req, res) => {
    try {
        let data = await testService.getAllData();

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

const deleteData = async (req, res) => {
    try {
        let data = await testService.deleteData(req.params.dataId);

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

module.exports = {
    handleSaveInfo,
    showSaveInfo,
    deleteData
}