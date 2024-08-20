const express = require("express");
const mongoose = require("mongoose");
const mongoURL = ("mongodb+srv://tinthtooko:htooko241364@atlascluster.ulvps.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster")
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser")
const CategoryRoute = require('./route/CategoryRoute')
const UserRoute = require('./route/UserRoute')
const RoleRoute = require('./route/RoleRoute')
const ActionRoute = require('./route/ActionRoute')
const ProductRoute = require('./route/ProductRoute')
const CartRoute = require('./route/AddToCartRoute')
const ContentRoute = require('./route/ContentRoute')
const CheckoutRoute = require('./route/CheckoutRoute')
const PaymentRoute = require('./route/PaymentRoute')
const app = express();
app.use(express.static('public'))

mongoose.connect(mongoURL).then(()=>{
    console.log('db connected');
    app.listen(process.env.PORT,()=>{
        console.log(`server running on port ${process.env.PORT}`);
    })   
})

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())
app.use('/category',CategoryRoute)
app.use('/role',RoleRoute)
app.use('/user',UserRoute)
app.use('/action',ActionRoute)
app.use('/product',ProductRoute)
app.use('/cart',CartRoute)
app.use('/content',ContentRoute)
app.use('/checkout',CheckoutRoute)
app.use('/payment',PaymentRoute)