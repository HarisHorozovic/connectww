import React from 'react';

import './message-send.styles.scss';

class MessageSend extends React.Component {
  constructor() {
    super();

    this.state = {
      message: ''
    };
  }

  handleMessageChange = e => {
    this.setState({ message: e.target.value });
  };

  sendMessage = () => {
    //handle submiting message to the database here
    console.log(this.state.message);
    this.setState({ message: '' });
  };

  render() {
    const { messages } = this.props;

    return (
      <div className='message-send-container flex-full-center'>
        <input
          type='text'
          placeholder='Message'
          className='message-send'
          value={this.state.message}
          onChange={this.handleMessageChange}
        />
        <button className='btn btn-blue' onClick={this.sendMessage}>
          &#x27A3;
        </button>
      </div>
    );
  }
}

export default MessageSend;
