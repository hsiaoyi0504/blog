import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import './react-draft-wysiwyg.css';
import './style.css';

class NewPost extends Component {
  constructor(props) {
    super(props);
    const editorState = EditorState.createEmpty();
    this.state = {
      title: '',
      redirect: false,
      editorState,
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  hadndleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    const { editorState } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Write A New Blog Post</h2>
        </div>
        <form onSubmit={(event) => {
          const { editorState } = this.state;
          event.preventDefault();
          fetch('/api/post/new', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: this.state.title,
              content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            }),
          }).then(() => {
            this.setState({
              editorState: EditorState.createEmpty(),
              redirect: true,
            });
          });
        }}
        >
          <label>Title:</label>
          <input
            placeholder="Blog Post Title"
            value={this.state.title}
            type="text"
            onChange={event => this.hadndleTitleChange(event)}
          /><br />
          <div className="editor-wrapper">
            <Editor
              editorState={editorState}
              onEditorStateChange={editorState => this.onEditorStateChange(editorState)}
            />
          </div>
          <input className="submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default NewPost;
