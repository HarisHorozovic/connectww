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
    // submit to parsed messageSession id (messageSession from this.props)
    console.log(this.state.message);
    this.setState({ message: '' });
  };

  uploadImg = () => {
    //Upload img in the similar way to sending message
    console.log('Upload new img');
  };

  render() {
    return (
      <div className='message-send-container flex-full-center'>
        <input
          type='text'
          placeholder='Message'
          className='message-send'
          value={this.state.message}
          onChange={this.handleMessageChange}
        />
        <div className='btn-container flex-wrap-center'>
          <button className='btn btn-transparent' onClick={this.uploadImg}>
            &#x21ea;
          </button>
          <button className='btn btn-main' onClick={this.sendMessage}>
            &#x27A3;
          </button>
        </div>
      </div>
    );
  }
}

export default MessageSend;
