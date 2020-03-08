import React, { Component } from 'react';
import Messenger from '../Chat/Messenger';

export default class Chat extends Component {
  render() {
    return (
      <div className="App">
        <Messenger />
      </div>
    );
  }
}