import React from 'react';

import './match-page.styles.scss';

// Components
import MessageItem from '../../components/messages-item/messages-item.component';
import MessageSend from '../../components/message-send/message-send.component';
import SetMatchPreferences from '../../components/set-match-preferences/set-match-preferences.component';
import MatchedWith from '../../components/matched-with/matched-with.component';
import MatchWithUser from '../../components/match-with-user/match-with-user.component';

class MatchPage extends React.Component {
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
      },
      section: 'chattingwith',
      preferences: {
        gender: '',
        ageFrom: '',
        ageTo: ''
      }
    };
  }

  changeSection = section => {
    this.setState({ section });
  };

  render() {
    const { messageSession, section } = this.state;
    return (
      <div className='match-page'>
        <div className='match-page-container flex-wrap-center'>
          <div className='left-content content-container'>
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
          <div className='right-content content-container'>
            <ul className='match-subnav flex-wrap-center'>
              <li onClick={() => this.setState({ section: 'chattingwith' })}>
                Chatting With
              </li>
              <li onClick={() => this.setState({ section: 'setpreferences' })}>
                Set Preferences
              </li>
              <li onClick={() => this.setState({ section: 'match' })}>
                Match 'N Chat
              </li>
            </ul>
            <div className='right-main-content'>
              {section === 'chattingwith' ? (
                <MatchedWith />
              ) : section === 'setpreferences' ? (
                <SetMatchPreferences />
              ) : (
                <MatchWithUser />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchPage;
