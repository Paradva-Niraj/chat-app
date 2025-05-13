const express = require('express')
const bcrypt = require('bcryptjs')
const jws = require('jsonwebtoken')
const User = require('../models/user');
const twilio = require("twilio");
const router = express.Router();


// regiter user

router.post('/register', async (req, res) => {
    const { phone, password, name, dob } = req.body;
    try {
        const existing = await User.findOne({ phone })
        if (existing) return res.status(400).json({ msg: "User exist" });

        const hasedpass = await bcrypt.hash(password, 10);
        const user = new User({ phone, password: hasedpass, name, dob });
        await user.save();

        res.json({ msg: "Register Successfull" })
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// login user

router.post('/login', async (req, res) => {
    const { phone, password } = req.body;

    try {
        const user = await User.findOne({ phone });
        if (!user) return res.status(400).json({ msg: "User Not Exist" })

        const ismatch = await bcrypt.compare(password, user.password);

        if (!ismatch) return res.status(200).json({ msg: "Password Not Match" })

        const token = jws.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json({ token, user: { id: user._id, phone: user.phone, name: user.name } });

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// register contact authenticate 

// create service from site
const accountSid = process.env.TWILIO_ID;
const authToken = process.env.TWILIO_AUTH;
const client = twilio(accountSid, authToken);
const serviceid = process.env.TWILIO_SERVICEID;

// send otp 
router.post('/sendOTP', async (req, res) => {
    const { phone } = req.body;
    console.log(phone);
    
    try {
        
        if (!phone) return res.status(400).json({ msg: "Phone is required" });
        const verification = await client.verify.v2
            .services(serviceid)
            .verifications.create({
                channel: "sms",
                to: phone,
            });

        res.status(200).json({ success: true, sid: verification.sid })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// success check otp 

router.post('/confirmOTP', async (req, res) => {
    const { phone, code } = req.body;
    console.log(phone,code);
    
    try {
        
        const verificationCheck = await client.verify.v2
            .services(serviceid)
            .verificationChecks.create({
                code: code,
                to: phone,
            });

        console.log(verificationCheck.status);
        res.status(200).json({ status: verificationCheck.status })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})


module.exports = router;