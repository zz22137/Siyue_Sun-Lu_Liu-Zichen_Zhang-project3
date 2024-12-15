const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');

const router = express.Router();


router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const posts = await Post.find({ userId: user._id }).sort({ createdAt: -1 });

        res.json({
            user: {
                id: user._id,
                username: user.username,
                description: user.description || 'No description provided.',
                createdAt: user.createdAt,
            },
            posts,
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
