const express = require('express')
const User = require('../models/user');
const auth = require('../middeleware/auth')
const router = express.Router();

router.post('/searchnew', auth, async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ msg: 'Phone number is required' });
    }

    try {
        // console.log(phone);
        
        const user = await User.findOne({phone}).select('-password');

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const data = user; // Result is stored in data
        res.status(200).json(data);
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ msg: "can't fetch data" });
    }
});

module.exports = router;