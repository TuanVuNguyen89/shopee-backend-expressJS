require('dotenv').config();
const jwt = require('jsonwebtoken');

const nonSecurePaths = ['/login', '/admin', '/', '/shop/read', '/product/read', '/product/image/read'];
const nonSecurePaths_2 = ['/login', '/admin', '/', '/account', '/shop/read', '/product/read', '/product/image/read', '/product/delete'];

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;

    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
        //console.log(token);
    }
    catch (err) {
        console.log(err);
    }

    //console.log(token);

    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;

    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    }
    catch (err) {
        console.log(err);
    }

    return data;
}

const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths_2.some(path => req.path.startsWith(path))) {
        return next();
    }

    // nonSecurePaths_2.map((route, index) => {
    //     console.log(route);
    // });

    //console.log("req.path", req.path);

    if (req.user) {
        let roles = req.user.DT;

        //console.log("email ", email, " roles ", roles);
        let currentUrl = req.path;

        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `you don't have permission to access this resource...`
            })
        }

        //roles.map((role, index) => {
        //    console.log("role ", index, ": ", role);
        //});
        let canAccess = roles.some(item => item.url === currentUrl);
        if (canAccess === true) {
            next();
        }
        else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `you don't have permission to access this resource...`
            })
        }
        //console.log("email ", email, " roles ", roles);
    }
    else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user'
        })
    }
}

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();

    //console.log("req.path", req.path);
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyToken(token);

        //console.log("decoded", decoded);
        //next();

        if (decoded) {
            req.user = decoded;
            req.token = token;

            next();
        }
        else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Not authenticated the user'
            })
        }

        //console.log(">>> myJWT ", token);
    }
    else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user'
        })
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission
}