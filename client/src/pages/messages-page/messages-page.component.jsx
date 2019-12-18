import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './messages-page.styles.scss';

// Components
import SidebarLeft from '../../components/sidebar-left/sidebar-left.component';
import MessageItem from '../../components/messages-item/messages-item.component';
import MessageSend from '../../components/message-send/message-send.component';

class MessagesPage extends React.Component {
  constructor() {
    super();

    this.state = {
      messageSession: {
        _id: 'messageSessionId',
        user: 'ObjectId User',
        chatBuddy: 'ObjectId User1',
        messages: [
          {
            _id: 'messageId',
            sender: 'ObjectId User',
            text: 'message here',
            sentImg: null,
            createdAt: 'date Sent'
          },
          {
            _id: 'messageId1',
            sender: 'ObjectId User1',
            text: '',
            sentImg: 'sentImginDatabase',
            createdAt: 'date Sent'
          }
        ]
      }
    };
  }

  render() {
    if (!this.props.currentUser) {
      return <Redirect to='/' />;
    } else {
      const { messageSession } = this.state;
      return (
        <div className='messages-page'>
          <div className='messages-page-container flex-wrap-container'>
            <SidebarLeft location='messagespage' />

            <div className='main-content flex-hor-center'>
              <div className='mp-container flex-hor-center'>
                {messageSession.messages.map(message => (
                  <MessageItem
                    key={message._id}
                    currUser={messageSession.user}
                    sender={message.sender}
                    text={message.text}
                    img={message.sentImg}
                    createdAt={message.createdAt}
                  />
                ))}
                <MessageSend
                  messageSession={messageSession._id}
                  messages={messageSession.messages}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

export default connect(mapStateToProps)(MessagesPage);
