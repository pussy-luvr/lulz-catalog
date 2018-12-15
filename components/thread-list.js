import React from "react";

import Thread from "./thread";

class ThreadList extends React.Component {
  render() {
    let threadComponents = [];
    for (let thread of this.props.threads) {
      threadComponents.push(<Thread key={thread} thread={thread} />);
    }

    return (
      <div className="catalog">
        <h1 style={{textAlign: 'center'}}>{this.props.title}</h1>
        <div className="threads" style={{display:'flex',flexWrap:'wrap',justifyContent: 'space-evenly'}}>
          {threadComponents}
        </div>
      </div>
    );
  }
}

export default ThreadList;
