import React from 'react';
import { Link } from 'react-router-dom';

import './post-item.styles.scss';

//Components
import CommentsContainer from '../comments-container/comments-container.component';

class PostItem extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: 'Haris',
      userImg: '',
      hidden: true
    };
  }

  showComments = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  getUserData = userId => {
    //Get the user data using userId

    //Set the state to userId
    this.setState({ userName: 'Mike', age: 25, userImg: '123' });
  };

  componentDidMount() {
    //Get user data as soon as component mounts and store it in the state
    // getUserData(this.props.user);
  }
  render() {
    const { postId, img, text, createdAt, likes, dislikes, user } = this.props;
    const { userName, hidden, userImg } = this.state;
    return (
      <div className='card post-item'>
        <div className='flex-full-center post-item-header'>
          <div className='user-meta flex-row-end'>
            <img src={this.state.userImg} alt='userImg' />
            <div className='text-info'>
              <Link to={`/profile/${user}`}>{userName}</Link>
              <p className='lead'>{createdAt}</p>
            </div>
          </div>
        </div>
        {/* <!-- Post content --> */}
        <div className='post-content flex-hor-center'>
          {img === null ? (
            <p className='post-text'>{text}</p>
          ) : (
            <div className='post-img flex-hor-center'>
              <img src={img} alt='postImg' />
              <p>{text}</p>
            </div>
          )}

          <div className='btn-container flex-full-center'>
            <div className='btn btn-transparent post-btn'>
              &#x2764;
              <span>{likes ? likes.length : 0}</span>
            </div>
            <div className='btn btn-transparent post-btn'>
              &#x2661; <span>{dislikes ? dislikes.length : 0}</span>
            </div>
            <div
              className='btn btn-transparent post-btn'
              onClick={this.showComments}
            >
              &#x275E;
            </div>
          </div>
        </div>
        {/* <!-- Post content -->*/}
        {/* <!-- Comments --> */}
        <CommentsContainer postId={postId} hidden={hidden} />
        {/* <!-- Comments --> */}
      </div>
    );
  }
}

export default PostItem;
