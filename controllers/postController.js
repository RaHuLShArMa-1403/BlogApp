const Post = require('../models/post');

const postsController = {
  createPost: async (req, res) => {
    try {
      const { title, content, author, tags } = req.body;
      const newPost = new Post({ title, content, author, tags });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const skip = (page - 1) * pageSize;
      const posts = await Post.find().skip(skip).limit(Number(pageSize));
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { title, content, author, tags } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        { title, content, author, tags },
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.postId);
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = postsController;
