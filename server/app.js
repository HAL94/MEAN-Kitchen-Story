const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(
    process.env.DB_HOST,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, 
    () => console.log('connected to localhost mongodb'),
    (error) => console.error(error)
);

const AutoCreateUsers = require('./_utils/auto-create-users');

const userRoutes = require('./user/routes/user.routes');
const productRoutes = require('./product/routes/product.routes');
const customerRoutes = require('./customer/routes/customer.routes');
const cartRoutes = require('./orders_and_cart/routes/cart.routes');
const orderRoutes = require('./orders_and_cart/routes/order.routes');
const userPaymentRoutes = require('./user_payments/routes/payment.routes');

const app = express();

AutoCreateUsers.autoCreateUsers();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 
        'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", customerRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api", userPaymentRoutes);

app.use((req, res, next) => {
    res.status(404).json({message: "Not Found"});
});

module.exports = app;