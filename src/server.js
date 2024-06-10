const express = require("express");
const bodyParser = require('body-parser');
const connection = require('./config/connectDB')
const initApiRoutes = require('./routes/api');
const initShopApiRoutes = require('./routes/shopApi')
const initProductRoutes = require('./routes/productApi');
const initCategoryRoutes = require('./routes/categoryApi');
const initLoginRoutest = require('./routes/login');
const configCors = require("./config/cors");
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8080;

configCors.configCors(app);

// congig body-parser
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5gb' }));
app.use(bodyParser.urlencoded({ limit: '5gb' }));

// config cookie-parser
app.use(cookieParser());

// test connection db
connection();

// init api routes
initApiRoutes(app);
initShopApiRoutes(app);
initProductRoutes(app);
initCategoryRoutes(app);
initLoginRoutest(app);

app.use((req, res) => {
    return res.send("404 Not Found");
});

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
});