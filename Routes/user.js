const express = require('express')
const router = express.Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js');

const { verifyToken, verifyTokenAuthorization, verifyTokenAndAdmin } = require('../Routes/verifyToken')

//Update user
router.put('/:id', verifyTokenAuthorization, async (req, res) => {

    
        if(req.body.password){
            req.body.password=CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_ENCRYPT)
                .toString()
        }
        try {
        const updateduser = await User.findByIdAndUpdate(req.params.id,{$set:req.body} , { new: true })
        res.status(200).json({ updateduser })
        
    } catch (error) {
        res.status(500).json(error)
    }

})


//delete user
router.delete('/:id', verifyTokenAuthorization, async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ user, msg: "above user is deleted" })
    } catch (error) {
        res.status(500).json(error)
    }

})


//get user
router.get('/:id', verifyTokenAuthorization, async (req, res) => {

    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;
        res.status(200).json({ others })
    } catch (error) {
        res.status(500).json(error)
    }

})

//get all  users
router.get('/', verifyTokenAndAdmin, async (req, res) => {

    try {
        const user = await User.find()
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router;