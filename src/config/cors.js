const configCors = (app) => {
    // Add headers before the routes are defined
    app.use(function (req, res, next) {
        const allowedOrigins = ['http://localhost:3000','https://mnmtkg1g-3000.asse.devtunnels.ms'];
        const origin = req.headers.origin;

        console.log(origin);
        console.log(allowedOrigins.includes(origin));
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);

        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }

        next();
    });
}

module.exports = {
    configCors
}
