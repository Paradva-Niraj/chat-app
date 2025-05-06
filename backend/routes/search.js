const express = require('express')
const User = require('../models/user');
const auth = require('../middeleware/auth')
const router = express.Router();

router.get('/searchnew',auth,async(req,res)=>{
    const {phone} = req.query;
    try{
        const data = await User.find({phone}).select('-password');
        if(data.length <= 0) return res.status(400).json({msg:"User Not Exist"});

        res.json(data);
    }
    catch(err){
        res.status(500).json({msg:"can't fetch data"})
    }
})

module.exports = router;