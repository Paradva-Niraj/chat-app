const express = require('express');
const Friend = require('../models/friend');
const User = require('../models/user');
const auth = require('../middeleware/auth');
const router = express.Router();

// Route to add a friend - with extensive debugging
router.post('/add', auth, async (req, res) => {
    const { friendPhone,userphone } = req.body;
    
    try {
        // Validate input
        if (!friendPhone && !userphone) {
            return res.status(400).json({ msg: 'Friend phone number is required' });
        }
        
        const userId = req.user.id;
        
        // Find the current user to verify
        const currentUser = await User.findById(userId);
        
        if (!currentUser) {
            return res.status(404).json({ msg: 'Current user not found' });
        }
        
        // Find the friend by phone
        const friend = await User.findOne({ phone: friendPhone });
        
        if (!friend) {
            return res.status(404).json({ msg: 'Friend not found with that phone number' });
        }
        
        // Prevent adding self
        if (currentUser.phone === friendPhone) {
            return res.status(400).json({ msg: 'You cannot add yourself as a friend' });
        }
        
        // Find or create friend list
        let friendList = await Friend.findOne({ user: userId }); 
        let frdfrdList = await Friend.findOne({ user: friend._id})

        if (!friendList && !frdfrdList) { 
            friendList = new Friend({
                user: userId,
                friends: [friend._id]
            });
            frdfrdList = new Friend({
                user:friend._id,
                friends:[userId]
            });
        } else {
            // Check for duplicate (convert ObjectIds to strings for comparison)
            const friendIdStr = friend._id.toString();
            const isDuplicate = friendList.friends.some(id => id.toString() === friendIdStr);
             
            console.log("error at frd adding");
            if (isDuplicate) {
                return res.status(400).json({ msg: 'Friend already added' });
            }
             
            friendList.friends.push(friend._id);
        }
         
        await friendList.save(); 
        await frdfrdList.save();
        res.json({ msg: 'Friend added successfully' });
    } catch (err) { 
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Route to fetch friends - with debugging
router.get('/list', auth, async (req, res) => { 
    
    try {
        const userId = req.user.id; 
        
        // Find and populate friend list
        const friendList = await Friend.findOne({ user: userId })
            .populate('friends', 'name phone');
             
        if (!friendList || !friendList.friends.length) {
            return res.json([]);
        }
        
        res.json(friendList.friends);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

module.exports = router;