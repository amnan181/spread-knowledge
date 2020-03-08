import React, { Component } from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import { connect } from 'react-redux';

import './ConversationList.css';

let user = localStorage.getItem("authUser");
user = JSON.parse(user); 

class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      users: []
    };
  }

  componentWillMount() {
    this.getConversations();
  }

  getConversations = () => {
    
    let acs = this.props.conversations;
    let cs = [];

    if(acs.length > 0) {
      cs = acs.filter( c => (c.reciever == user.id) || (c.sender == user.id) );
      
      let ids = cs.map( c => {
        if(c.sender == user.id) {
          return c.reciever
        } else if( c.reciever == user.id ) {
          return c.sender
        }
      });
      let dup = [...new Set(ids)];
      console.log("+++++++++++Duplication+++++++++++", dup);
      let users = [];
      for( let i=0; i<dup.length; i++ ) {
        for(let j=0; j<this.props.users.length; j++) {
          if(dup[i] == this.props.users[j].id) {
            users = users.concat(this.props.users[j]);
          }
        }
      }
      console.log("++++++++++++Users++++++++++", users);

      this.setState({
        users: users,
        conversations: cs
      });
    } else {
      alert("No message found!")
    }
  }

  render() {
    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        <ConversationSearch />
        {
          this.state.users.length == 0 ? <div>No user</div> :
          this.state.users.map(user =>
            <ConversationListItem
              key={user.id}
              data={user}
              conversationItemClickHandler={this.props.conversationItemClickHandler}
            />
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    conversations: store.messageReducer.messages,
    users: store.tutorDataReducer.tutors
  }
}

export default connect(mapStateToProps)(ConversationList); 