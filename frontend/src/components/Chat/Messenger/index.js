import React, { Component } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';

export default class Messenger extends Component {
  state = {
    user: null
  }

  conversationItemClickHandler = (user) => {
    this.setState({user})
    user = JSON.stringify(user);
    localStorage.setItem("chatUser", user);
  }


  render() {
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList conversationItemClickHandler={this.conversationItemClickHandler} />
        </div>

        <div className="scrollable content">
          <MessageList user={this.state.user} />
        </div>
      </div>
    );
  }
}