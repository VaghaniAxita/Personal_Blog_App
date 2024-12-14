const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');


const upload = multer({ dest: 'uploads/' });

router.post('/post', authMiddleware, upload.single('file'), postController.createPost);
router.get('/post', postController.getAllPosts);
router.get('/post/:id', postController.getPost);
router.put('/post/:id', authMiddleware, upload.single('file'), postController.updatePost);

module.exports = router;