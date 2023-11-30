const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: { type: String, required: true, maxlength: 1000 },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;