import React from 'react';

import './groups-page.styles.scss';

// Components
import MessageItem from '../../components/messages-item/messages-item.component';
import MessageSend from '../../components/message-send/message-send.component';
import SidebarRight from '../../components/sidebar-right-container/sidebar-right-container.component';
import SidebarLeft from '../../components/sidebar-left/sidebar-left.component';

class GroupsPage extends React.Component {
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
    const { messageSession } = this.state;
    return (
      <div className='messages-page'>
        {/* <!-- Profile View Page main content--> */}
        <div className='flex-wrap-container'>
          <SidebarLeft location='groupspage' />

          <div className='groups-main-content flex-hor-center'>
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

          <SidebarRight location='groupspage' />
        </div>
      </div>
    );
  }
}

export default GroupsPage;
