const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));

const port = 3001;

const schema = new mongoose.Schema({title: 'string', content: 'string' });
const Post = mongoose.model('Post', schema);


app.get('/api/posts', function (req, res) {
  console.log('Got a GET request of all posts');
  Post.find({}).then(posts => res.send(posts));
});

app.get('/api/post/:id', function (req, res) {
  console.log('Got a GET request of post id:'+req.params.id);
  Post.findOne({_id: req.params.id}).then(post => res.send(post));
});

app.post('/api/post/new', function (req, res) {
  console.log('Got a POST request');
  Post.create({ title: req.body.title, content: req.body.content }).then( res.send("Post Success"));
});

app.post('/api/post/:id', function (req, res) {
  console.log('Got a POST request of post id:'+req.params.id);
  Post.findByIdAndUpdate({ _id: req.params.id }, {title: req.body.title, content: req.body.content }).then(res.send("Post Success"));
});

app.listen(port, function () {
  // var initial_posts = [
  //   {
  //     title: 'First Blog',
  //     content: 'Test',
  //   },
  //   {
  //     title: 'Second Blog',
  //     content: 'Test 2',
  //   }
  // ];
  // for(i=0; i<initial_posts.length; i++){
  //   Post.create(initial_posts[i]);
  // }
  console.log('Blog App listening on port: ' + port);
});