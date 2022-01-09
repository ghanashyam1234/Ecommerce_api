const express=require('express');
const Product = require('../models/Product');
const router=express.Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js');
const StatusCode=require('http-status-codes')
const { verifyToken, verifyTokenAuthorization, verifyTokenAndAdmin } = require('../Routes/verifyToken')



//create products

router.post('/',verifyTokenAndAdmin,async(req,res)=>{


    try {
        const product= await Product.create(req.body);
        res.status(200).json(product)
    } catch (error) {
        res.status(StatusCode.CREATED).json(error)
        
    }


})


//update products
router.put('/:id',verifyTokenAndAdmin,async(req,res)=>{
    try {
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(product)
    } catch (error) {
        res.status(StatusCode.CREATED).json(error)
    }
})


//delete products
router.delete('/:id',verifyTokenAndAdmin,async(req,res)=>{
    try {
        const product=await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({product,msg:"above product has been deleted"})
    } catch (error) {
        res.status(StatusCode.CREATED).json(error)
    }
})


//get single product
router.get('/:id',async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
    res.status(200).json({product})
    } catch (error) {
        res.status(StatusCode.CREATED).json(error)
    }
})

//get all product
router.get('/',async(req,res)=>{
    const qNew=req.query.new;
    const qCatagory=req.query.catagory;

    try {
        let products;

        if(qNew){
            products=await Product.find().sort({createdAt: -1}).limit(5);
        }
        else if(qCatagory){
            products=await Product.find({
                catagories:{$in:[qCatagory]}
            })
        }
        else{
            
        products=await Product.find()
        }
        res.status(200).json({products})


    } catch (error) {
        res.status(StatusCode.CREATED).json(error)
    }
})



module.exports=router;