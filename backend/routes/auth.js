const express = require('express')
const bcrypt = require('bcryptjs')
const jws = require('jsonwebtoken')
const User = require('../models/user');

const router = express.Router();


// regiter user
router.post('/register',async(req,res) => {
    const {phone,password,name,dob} = req.body;
    try{
        const existing = await User.findOne({phone})
        if(existing) return res.status(400).json({msg:"User exist"});

        const hasedpass = await bcrypt.hash(password,10);
        const user = new User({phone,password:hasedpass,name,dob});
        await user.save();

        res.json({msg:"Register Successfull"})
    }
    catch (err){
        res.status(500).json({ error: err.message });
    }
})


// login user

router.post('/login',async(req,res)=>{
    const {phone,password} = req.body;

    try{
        const user = await User.findOne({phone});
        if(!user) return res.status(400).json({msg:"User Not Exist"})

        const ismatch = await bcrypt.compare(password,user.password);

        if(!ismatch) return res.status(200).json({msg:"Password Not Match"})
        
        const token = jws.sign({id:user.id},process.env.JWT_SECRET);
        res.json({token,user:{id: user._id, phone: user.phone, name: user.name}});

    }
    catch(err)
    {
        res.status(500).json({error:err.message})
    }
})



module.exports = router;