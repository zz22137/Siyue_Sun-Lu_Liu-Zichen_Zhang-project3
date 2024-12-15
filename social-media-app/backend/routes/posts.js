const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });


router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username').sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/', upload.single('image'), async (req, res) => {
    const { userId, content } = req.body;
    try {
        const post = new Post({
            userId,
            content,
            image: req.file?.path,
        });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

    
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        
        if (post.userId.toString() !== req.body.userId) {
            return res.status(403).json({ error: 'You are not authorized to delete this post' });
        }

        await post.remove();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
