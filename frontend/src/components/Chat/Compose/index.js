import React, { Component } from 'react';
import './Compose.css';
import { connect } from 'react-redux';
import { addMessage } from '../../../redux/actions/MessageAction';

class Compose extends Component {
  state = {
    text: ''
  }

  sendMessage = () => {
    if(this.state.text === '') {
      alert("You can not send empty message!")
    } else {
      let sender = JSON.parse(localStorage.getItem("authUser"));
      let reciever = JSON.parse(localStorage.getItem("chatUser"));
      console.log('===============S,R=====================');
      console.log(sender, reciever);
      console.log('====================================');
      if(reciever && sender) {
        let message = {
          id: Math.random(),
          sender: sender.id,
          reciever: reciever.id,
          message: this.state.text,
          postedAt: new Date().getTime
        }
        this.props.addMessage(message);
      } else {
        alert("Select a user to chat!");
      }
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  render() {
    return (
      <div className="compose">
        <input
          type="text"
          value={this.state.text}
          onChange={this.onChangeHandler}
          className="compose-input"
          placeholder="Type a message, @name"
        />

        {
          this.props.rightItems
        }
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

export default connect(null, {addMessage})(Compose);