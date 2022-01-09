const express=require('express');
const Product = require('../models/Product');
const router=express.Router();
const User = require('../models/User')
const Cart=require('../models/Cart')
const CryptoJS = require('crypto-js');
const StatusCode=require('http-status-codes')
const { verifyToken, verifyTokenAuthorization, verifyTokenAndAdmin } = require('../Routes/verifyToken')



//create carts

router.post('/',verifyToken,async(req,res)=>{


    try {
        const cart= await Cart.create(req.body);
        res.status(200).json(cart)
    } catch (error) {
        res.status(StatusCode.CREATED).json(error)
        
    }


})


//update cart
router.put('/:id',verifyTokenAuthorization,async(req,res)=>{
    try {
        const cart=await Cart.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(cart)
    } catch (error) {
        res.status(StatusCode.CREATED).json(error)
    }
})


//delete products
router.delete('/:id',verifyTokenAuthorization,async(req,res)=>{
    try {
        const cart=await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json({cart,msg:"above product has been deleted"})
    } catch (error) {
        res.status(StatusCode.CREATED).json(error)
    }
})


//get single product
router.get('/:id',verifyTokenAuthorization,async(req,res)=>{
    try {
        const cart=await Cart.findById(req.params.id)
    res.status(200).json({cart})
    } catch (error) {
        res.status(StatusCode.CREATED).json(error)
    }
})

//get all product
router.get('/',verifyTokenAuthorization,async(req,res)=>{
    
        try{
            const cart=await Cart.find()
    
            res.status(200).json({cart})}
            
       


     catch (error) {
        res.status(StatusCode.CREATED).json(error)
    }
})



module.exports=router;