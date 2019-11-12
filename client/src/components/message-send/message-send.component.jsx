import React from 'react';

import './message-send.styles.scss';

class MessageSend extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className='message-send-container flex-full-center'>
        <input type='text' placeholder='Message' className='message-send' />
        <button className='btn btn-blue' onClick='SendMessage'>
          &#x27A3;
        </button>
      </div>
    );
  }
}

export default MessageSend;
