/* eslint react/jsx-filename-extension: "off" */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import AllPosts from './components/AllPosts';
import SinglePost from './components/SinglePost';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/post/new" component={NewPost} />
        <Route path="/post/edit/:id" component={EditPost} />
        <Route path="/post/:id" component={SinglePost} />
        <Route path="/" component={AllPosts} />
      </Switch>
    </div>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
