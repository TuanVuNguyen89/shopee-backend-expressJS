const loginService = require('../services/loginService');

const handleLogin = async (req, res) => {
    //console.log("check login from react: ", req.body);

    try {
        let data = await loginService.handleLogin(req.body);

        //set cookie
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    }
    catch {
        console.log(err);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code,
            DT: '', // data
        })
    }

};

const handleAccount = async (req, res) => {
    //console.log(">>> req", req.user.DT);
    return res.status(200).json({
        EM: 'ok',
        EC: 0,
        DT: {
            token: req.token,
            roles: req.user.DT
        }
    });
}

module.exports = {
    handleLogin,
    handleAccount
}