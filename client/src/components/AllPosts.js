/* eslint
no-console: "off",
no-underscore-dangle: "off" */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class AllPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [{ _id: '123', title: 'abc', content: 'cde' }],
    };
  }

  componentWillMount() {
    fetch('/api/posts')
      .then(
        response => response.json(),
        err => console.error(err),
      )
      .then((res) => {
        const resInv = res.reverse();
        this.setState({
          posts: resInv,
        });
      });
  }

  render() {
    const postItems = this.state.posts.map(
      post =>
        (<li className="post-item" key={post._id}>
          <a href={`/post/${post._id}`}>{post.title}</a>
        </li>),
    );
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Yi&#39;s Blog</h2>
        </div>
        <Link className="add" to={'/post/new'}>New Blog</Link>
        <ul>{postItems}</ul>
      </div>
    );
  }
}

export default AllPosts;
