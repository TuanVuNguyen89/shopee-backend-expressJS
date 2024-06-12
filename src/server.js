const express = require("express");
const bodyParser = require('body-parser');
const connection = require('./config/connectDB');
const initApiRoutes = require('./routes/api');
const initShopApiRoutes = require('./routes/shopApi');
const initProductRoutes = require('./routes/productApi');
const initCategoryRoutes = require('./routes/categoryApi');
const initLoginRoutest = require('./routes/login');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;

const allowedOrigins = ['http://localhost:3000', 'https://mnmtkg1g-3000.asse.devtunnels.ms/'];

app.use(cors());

// Configure body-parser
app.use(bodyParser.json({ limit: '5gb' }));
app.use(bodyParser.urlencoded({ limit: '5gb' }));

// Configure cookie-parser
app.use(cookieParser());

// Test database connection
connection();

// Initialize API routes
initApiRoutes(app);
initShopApiRoutes(app);
initProductRoutes(app);
initCategoryRoutes(app);
initLoginRoutest(app);

// Handle 404
app.use((req, res) => {
    return res.send("404 Not Found");
});

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
});
