const express=require('express')
const app=express();
const port=process.env.PORT||5000;
const mongoose=require('mongoose');
require('dotenv').config();
const authRoute=require('./Routes/auth')
const userRoute=require('./Routes/user')
const productRoute=require('./Routes/product')
const orderRoute=require('./Routes/order')
const cartRoute=require('./Routes/cart')





app.use(express.json());
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/user',userRoute)
app.use('/api/v1/product',productRoute)
app.use('/api/v1/order',orderRoute)
app.use('/api/v1/cart',cartRoute)


const start=async ()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI)
        
app.listen(port,()=>{
    console.log("The server is listening to port:"+port);
})


        
    } catch (error) {
        console.log(error);
    }
}

start();


