import React from "react";

class Thread extends React.Component {
  render() {
    let subjectDiv = '';
    if (this.props.thread.subject!='') {
      subjectDiv = <div><b>{this.props.thread.subject}</b></div>;
    }

    return (
      <a href={this.props.thread.threadLink} style={{textDecoration:'none',color:'black'}}>
        <div className="thread" style={{overflow:'hidden',clear: 'both', width: '175px', height: '250px', textAlign: 'center', borderStyle: 'solid', borderWidth: '5px', backgroundColor: '#507B8A', borderColor: '#f0d4d1', padding: '15px',borderRadius:'15px',marginBottom:'15px'}}>
          <img src={this.props.thread.imageLink} alt={this.props.subject} style={{display: 'block',marginLeft:'auto',marginRight:'auto',maxWidth:'100%',maxHeight:'50%'}}/>
          <br />
          <div><b>R:</b>{this.props.thread.numReplies}, <b>I:</b>{this.props.thread.numImages}</div>
          {subjectDiv}
          <div>
            {this.props.thread.comment}
          </div>
        </div>
      </a>
    );
  }
}

export default Thread;
