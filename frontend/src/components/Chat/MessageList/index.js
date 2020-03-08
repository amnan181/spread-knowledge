import React, { Component } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import { connect } from 'react-redux';

import './MessageList.css';


let user = localStorage.getItem('authUser');
user = JSON.parse(user);

const MY_USER_ID = 'user.id';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatId: ''
    };
  }

  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  componentWillUpdate() {
    console.log('===============nextProps=====================');
  console.log(this.state.chatId);
  console.log('====================================');
  }

  componentWillReceiveProps(nextProps) {
    let u = nextProps.user;
    if(u) {
    this.setState({
        chatId: u.id
      })

    this.getMessages();
    }

  }

  getMessages = () => {
    let chatId = this.state.chatId;
    if(chatId != '') {
      let msgs = this.props.messages;
      msgs = msgs.filter(m => (m.sender == MY_USER_ID && m.reciever == chatId) || (m.reciever == MY_USER_ID && m.sender == chatId));

      console.log('===============msgs=====================');
    console.log(msgs);
    console.log('====================================');
      this.setState(prevState => {
        return {
          ...prevState,
          messages: msgs
        };
      });
    } else {
      this.setState({ currentlyChat: false })
    }
  }

  renderMessages() {
    let i = 0;
    let messageCount = this.state.messages.length;
    let messages = [];

    while (i < messageCount) {
      let previous = this.state.messages[i - 1];
      let current = this.state.messages[i];
      let next = this.state.messages[i + 1];
      let isMine = current.sender === MY_USER_ID;
      let currentMoment = moment(current.postedAt);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.postedAt);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.sender === current.sender;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.postedAt);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.sender === current.sender;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      messages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return messages;
  }

  render() {
    return(
      <div className="message-list">
        <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        />
        { this.state.messages.length == 0 ? 
            <h3 style={{marginTop: '25%'}}>No chat yet</h3> 
          :
           this.state.chatId != '' ? 
            <div className="message-list-container">{this.renderMessages()}</div>
            :
            <h3 style={{marginTop: '25%'}}>Select a user to chat</h3>
        }

        <Compose rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}/>
        
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    messages: store.messageReducer.messages
  }
}

export default connect(mapStateToProps)(MessageList);