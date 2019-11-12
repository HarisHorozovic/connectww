import React from 'react';
import { Link } from 'react-router-dom';

import './comments.styles.scss';

class CommentItem extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: 'Haris',
      userImg: ''
    };
  }

  componentDidMount() {
    // fetchUser(this.props.user);
  }
  render() {
    const { text, createdAt, user } = this.props;
    const { userName, userImg } = this.state;
    return (
      <div className='comment-item flex-hor-center'>
        <div className='comment-item-header flex-wrap-center'>
          <img src={userImg} alt='userImg' />
          <Link to={`/profile/${user}`}>{userName}</Link>
        </div>
        <div className='comment-item-text'>
          <p>{text}</p>
        </div>
      </div>
    );
  }
}

export default CommentItem;
