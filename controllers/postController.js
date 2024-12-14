const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');


const upload = multer({ dest: 'uploads/' });


exports.createPost = (req, res) => {
  const { file } = req;
  const { token } = req.cookies;

  if (!token) return res.status(401).json('Not authenticated');
  if (!file) return res.status(400).json('No file uploaded');

  const { originalname, path } = file;
  const ext = originalname.split('.').pop();
  const newPath = `${path}.${ext}`;
  fs.renameSync(path, newPath);

  jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
    if (err) return res.status(403).json('Token invalid');

    const { title, summary, content } = req.body;
    try {
      const post = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: userData.id,
      });
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json('Failed to create post');
    }
  });
};


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json('Failed to fetch posts');
  }
};


exports.getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate('author', ['username']);
    if (!post) return res.status(404).json('Post not found');
    res.json(post);
  } catch (err) {
    res.status(500).json('Failed to fetch post');
  }
};


exports.updatePost = (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;

  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
    if (err) return res.status(403).json('Token invalid');

    try {
      const post = await Post.findById(id);
      if (!post) return res.status(404).json('Post not found');

      if (post.author.toString() !== userData.id) {
        return res.status(403).json('Not authorized');
      }

      const { title, summary, content } = req.body;
      let newCover = post.cover;
      if (req.file) {
        const { originalname, path } = req.file;
        const ext = originalname.split('.').pop();
        newCover = `${path}.${ext}`;
        fs.renameSync(path, newCover);
      }

      post.title = title;
      post.summary = summary;
      post.content = content;
      post.cover = newCover;

      await post.save();
      res.json(post);
    } catch (err) {
      res.status(500).json('Failed to update post');
    }
  });
};