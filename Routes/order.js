const express=require('express');
const Product = require('../models/Product');
const router=express.Router();
const User = require('../models/User')
const Order=require('../models/Order')
const CryptoJS = require('crypto-js');
const StatusCode=require('http-status-codes')
const { verifyToken, verifyTokenAuthorization, verifyTokenAndAdmin } = require('../Routes/verifyToken')



//create carts

router.post('/',verifyToken,async(req,res)=>{


    try {
        const order= await Order.create(req.body);
        res.status(200).json(order)
    } catch (error) {
        res.status(StatusCode.CREATED).json(error)
        
    }


})


//update order
router.put('/:id',verifyTokenAndAdmin,async(req,res)=>{
    try {
        const order=await Order.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(order)
    } catch (error) {
        res.status(StatusCode.CREATED).json(error)
    }
})


//delete order
router.delete('/:id',verifyTokenAndAdmin,async(req,res)=>{
    try {
        const order=await Order.findByIdAndDelete(req.params.id)
    res.status(200).json({order,msg:"above product has been deleted"})
    } catch (error) {
        res.status(StatusCode.CREATED).json(error)
    }
})


//get user order
router.get('/:id',verifyTokenAuthorization,async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id)
    res.status(200).json({order})
    } catch (error) {
        res.status(StatusCode.CREATED).json(error)
    }
})

//get all orders
router.get('/',verifyTokenAndAdmin,async(req,res)=>{
    
        try{
            const order=await Order.find()
    
            res.status(200).json({order})}
            
       catch (error) {
        res.status(StatusCode.CREATED).json(error)
    }
})

// //get monthly income
// router.get('/income',verifyTokenAndAdmin,async(req,res)=>{
//     const date=new Date();
//     const lastMonth=new Date(date.setMonth(date.getMonth()-1));
//     const previousMonth=new Date( new Date().setMonth(lastMonth.getMonth()-1))
//     try {
//         const income= await Order.aggregate([
//             {$match:{$createdAt:{$gte:previousMonth}}},
//             {$project:{
//                 month:{$month:$createdAt},
//                 sales:'$amount'
//             }},
//             {$group:{
//                 _id:"$month",
//                 total:{$sum:"$sales"}
//             }}
//         ])
//         res.status(200).json(income);
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })



module.exports=router;