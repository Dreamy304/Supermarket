const express = require('express');
const graphqlHTTP = require('express-graphql');
// const {}=require('./config/dbconfig');
// const adminSchema = require('./schema/adminSchema');
const loginSchema = require('./schema/loginSchema');
const categorySchema = require('./schema/categorySchema');
const productSchema = require('./schema/productSchema');
const customerSchema = require('./schema/customerSchema');
// const orderSchema = require('./schema/orderSchema');
// const cartSchema = require('./schema/cartSchema');
// const clientSchema = require('./schema/clientSchema');
// const storeSchema = require('./schema/storeSchema');
// const storeStockSchema = require('./schema/storeStockSchema');
const cors = require('cors');
const loggingMiddleware=require('./auth/middleware')
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');



const app = express();

app.use(cors({ origin: true }));
// app.use('/api/admin-login', graphqlHTTP({ schema: adminSchema, graphiql: true }));
app.use('/api/login', graphqlHTTP({ schema: loginSchema, graphiql: true }));
app.use(loggingMiddleware);
app.use('/api/category', graphqlHTTP({ schema: categorySchema, graphiql: true }));
app.use('/api/product', graphqlHTTP({ schema: productSchema, graphiql: true }));
app.use('/api/customer', graphqlHTTP({ schema: customerSchema, graphiql: true }));
// app.use('/api/order', graphqlHTTP({ schema: orderSchema, graphiql: true }));
// app.use('/api/cart', graphqlHTTP({ schema: cartSchema, graphiql: true }));
// app.use('/api/store', graphqlHTTP({ schema: storeSchema, graphiql: true }));
// app.use('/api/storestock', graphqlHTTP({ schema: storeStockSchema, graphiql: true }));
// app.use('/api/client', graphqlHTTP({ schema: clientSchema, graphiql: true }));

app.listen(8080, () => {
    console.log('Server running successfully...')
})
