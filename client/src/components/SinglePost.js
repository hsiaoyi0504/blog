import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState } from 'draft-js';
import './react-draft-wysiwyg.css';
import './style.css';

class SinglePost extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    let editorState = EditorState.createEmpty();
    this.state = {
      id,
      title: "This post didn't exist",
      content: "No article found",
      editorState
    };
  }

  componentWillMount() {
    fetch('/api/post/'+this.state.id)
    .then(
      response => response.json(),
      err => console.error(err),
    )
    .then((res) => {
      this.setState({
        title: res.title,
        content: res.content,
      });
    });
  }

  render() {
    var json = this.tryParseJSON(this.state.content);
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
        <h1>{this.state.title}</h1>
        <Link to={'/post/edit/'+this.state.id} >Edit</Link>
        <div className='editor-wrapper'>
          <Editor toolbarHidden readOnly="true" editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.content)))}/>
        </div>
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

export default SinglePost;
