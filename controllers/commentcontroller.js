const Post = require('../models/post');

const commentsController = {
  addComment: async (req, res) => {
    try {
      const { content, author } = req.body;
      const newComment = { content, author };
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      post.comments.push(newComment);
      const savedPost = await post.save();
      res.status(201).json(savedPost.comments[savedPost.comments.length - 1]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllComments: async (req, res) => {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const skip = (page - 1) * pageSize;
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      const comments = post.comments.slice(skip, skip + Number(pageSize));
      res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getCommentById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      const comment = post.comments.find((c) => c._id.toString() === req.params.commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.status(200).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateComment: async (req, res) => {
    try {
      const { content, author } = req.body;
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      const commentIndex = post.comments.findIndex((c) => c._id.toString() === req.params.commentId);
      if (commentIndex === -1) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      post.comments[commentIndex].content = content;
      post.comments[commentIndex].author = author;
      const savedPost = await post.save();
      res.status(200).json(savedPost.comments[commentIndex]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      const commentIndex = post.comments.findIndex((c) => c._id.toString() === req.params.commentId);
      if (commentIndex === -1) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      post.comments.splice(commentIndex, 1);
      const savedPost = await post.save();
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = commentsController;
