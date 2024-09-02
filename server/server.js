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
const sendEmail = require('./helper/sendEmail') 

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
app.set('views','./views')
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    return res.send('hello world')
})
app.use('/category',CategoryRoute)
app.use('/role',RoleRoute)
app.use('/user',UserRoute)
app.use('/action',ActionRoute)
app.use('/product',ProductRoute)
app.use('/cart',CartRoute)
app.use('/content',ContentRoute)
app.use('/checkout',CheckoutRoute)
app.use('/payment',PaymentRoute)    

app.get('/send-mail', async(req,res)=>{
  try {
    await sendEmail({
        view : 'email',
        data : {
            name : 'Sayar Gyi'
        },
        from : 'LhJqN@example.com',
        to : 'htoo@example.com',
        subject : 'testing',
    
      })
      return res.send('email already send')
  } catch (e) {
    return res.status(500).json({message : e.message})
  }
})