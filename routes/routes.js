const express = require('express');
const app = express();

/*
|--------------------------------------------------------------------------
| Routing Part
|--------------------------------------------------------------------------
*/
// Load routes
app.use('/api/', require('./front/homeRoutes'));
app.use('/api/about', require('./front/homeRoutes'));
app.use("/api/errors", require('./errors/errorRoutes'));
app.use('/api', require('./auth/authRoutes'));
app.use('/api/panel/dashboard', require('./panel/dashboardRoutes'));
app.use('/api/panel/employees', require('./panel/employeeRoutes'));
app.use('/api/panel/users', require('./panel/userRoutes'));
app.use('/api/panel/brands', require('./panel/brandRoutes'));
app.use('/api/panel/product-categories', require('./panel/productCategoryRoutes'));
app.use('/api/panel/products', require('./panel/productRoutes'));
app.use('/api/panel/article-categories', require('./panel/ArticleCategoryRoutes'));
app.use('/api/panel/articles', require('./panel/ArticleRoutes'));
app.use('/api/panel/banks', require('./panel/BankRoutes'));
app.use('/api/panel/roles', require('./panel/roleRoutes'));
// profile account
app.use('/api/profile/my-profile', require('./profile/MyProfileRoutes'));
app.use('/api/profile/my-cart', require('./profile/MyCartsRoutes'));
app.use('/api/profile/my-transactions', require('./profile/MyTransactionsRoutes'));