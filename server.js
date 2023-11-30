const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://rahul1123:rahul3211@cluster0.sn8bvcy.mongodb.net/blog?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());

// Routes
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

app.use('/api/posts', postsRoutes);
app.use('/api/posts/:postId/comments', commentsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
