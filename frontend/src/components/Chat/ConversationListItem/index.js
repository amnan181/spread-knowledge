import React, { Component } from 'react';
import shave from 'shave';

import './ConversationListItem.css';

export default class ConversationListItem extends Component {
  componentDidMount() {
    shave('.conversation-snippet', 20);
  }

  render() {
    const user = this.props.data;
    let name = user.tName;

    return ( 
        <div className="conversation-list-item" onClick={() => this.props.conversationItemClickHandler(user)}>
          <div className="view">
            <h4 className="conversation-avatar">{name.charAt(0).toUpperCase()}</h4>
          </div>
          <div className="conversation-info">
            <h1 className="conversation-title">{ name }</h1>
            <p className="conversation-snippet"></p>
          </div>
        </div> 
    );
  }
}