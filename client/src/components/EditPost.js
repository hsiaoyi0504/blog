/* eslint react/jsx-filename-extension: "off" */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import './react-draft-wysiwyg.css';
import './style.css';

class EditPost extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    const editorState = EditorState.createEmpty();
    this.state = {
      redirect: false,
      id,
      title: "This post didn't exist",
      content: 'No article found',
      editorState,
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentWillMount() {
    fetch(`/api/post/${this.state.id}`)
      .then(
        response => response.json(),
        err => console.error(err),
      )
      .then((res) => {
        this.setState({
          title: res.title,
          content: res.content,
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(res.content)))
        });
      });
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  render() {
    var json = this.tryParseJSON(this.state.content);
    if(this.state.redirect) {
      return <Redirect push to={"/post/"+this.state.id} />;
    }
    if(!json){
      return ( 
      <div className="App">
        <h1>{this.state.title}</h1>
        <div>{this.state.content}</div>
      </div>
      );
    } else {
      return ( 
      <div className="App">
        <form onSubmit={(event) => {
          const { editorState } = this.state;
          event.preventDefault();
          fetch('/api/post/'+this.state.id, {
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
            onChange={event => this.handleTitleChange(event)}
          />
          <div className='editor-wrapper'>
            <Editor
              editorState={this.state.editorState}
              onEditorStateChange={editorState => this.onEditorStateChange(editorState)}
            />
          </div>
          <input className="submit" type="submit" value="Submit" />
        </form>
      </div>
      );
    }
  }

  tryParseJSON = (jsonString) => {
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
  };

}

export default EditPost;
