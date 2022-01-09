const express = require('express')
const router = express.Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const StatusCode=require('http-status-codes')



//User Register

router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(StatusCode.CREATED).json(error)
        
    }
   

})




router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        if (email || password) {
            const user = await User.findOne({ email });
            if (user) {
                //decrypting register pass for comparing to login password    
                const hashPass =await CryptoJS.AES.decrypt(user.password, process.env.PASS_ENCRYPT).toString(CryptoJS.enc.Utf8);

                

                if (hashPass===password) {
                    const accessToken = jwt.sign({ id: user._id,isAdmin:user.isAdmin },
                         process.env.JWT_SEC, { expiresIn:'30d' })
                    res.status(200).json({user,accessToken});
                }
                else {
                    res.status(401).json("please provid correct password")
                }

            } else { res.json('Please provide correct email') }

        } else { res.json('Please provide email and password') }





        //get token




    } catch (error) {
        res.json(error)

    }



})




module.exports = router;