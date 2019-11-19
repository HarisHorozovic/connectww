const fs = require('fs');

const posts = JSON.parse(fs.readFileSync(`${__dirname}/../_Data/Post.json`));

exports.checkID = (req, res, next, val) => {
  console.log(`Post id is: ${val}`);

  if (req.params.id * 1 > posts.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Post not found'
    });
  }
  next();
};

exports.checkPostBody = (req, res, next) => {
  if (!req.body.text) {
    res.status(400).json({
      status: 'fail',
      message: 'Post must have a post text'
    });
  }

  next();
};

exports.getAllPosts = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts
    }
  });
};

exports.createPost = (req, res, next) => {
  const newId = posts[posts.length - 1].id + 1;
  const newPost = Object.assign({ id: newId }, req.body);
  posts.push(newPost);
  fs.writeFile(
    `${__dirname}/../_Data/Post.json`,
    JSON.stringify(posts),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          post: newPost
        }
      });
    }
  );
};
exports.getPost = (req, res) => {
  const id = req.params.id * 1;
  const post = posts.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      post
    }
  });
};

exports.updatePost = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      post: 'Updated Post Here'
    }
  });
};

exports.deletePost = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
