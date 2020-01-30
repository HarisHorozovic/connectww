import React from 'react';

import './message-send.styles.scss';

const MessageSend = ({
  handleMessageChange,
  handleMessageSend,
  ...otherProps
}) => {
  return (
    <div className='message-send-container flex-full-center'>
      <input
        className='message-send'
        {...otherProps}
        onChange={handleMessageChange}
      />
      <div className='btn-container flex-wrap-center'>
        {/* <button className='btn btn-transparent' onClick={this.uploadImg}>
          &#x21ea;
        </button> */}
        <button className='btn btn-main' onClick={handleMessageSend}>
          &#x27A3;
        </button>
      </div>
    </div>
  );
};

export default MessageSend;
