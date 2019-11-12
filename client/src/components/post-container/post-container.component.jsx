import React from 'react';

import './post-container.styles.scss';

// Components
import PostItem from '../post-item/post-item.component';

class PostContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [
        {
          _id: '1',
          user: '1',
          postImg: null,
          text: 'post text',
          createdAt: 'created comment',
          likes: [
            {
              user: 'ObjectId User'
            },
            {
              user: 'ObjectId User'
            }
          ],
          dislikes: [
            {
              user: 'ObjectId User'
            }
          ]
        },
        {
          _id: '2',
          user: '1',
          postImg: 'hasimg',
          text: '',
          createdAt: 'created comment',
          likes: [
            {
              user: 'ObjectId User'
            }
          ],
          dislikes: [
            {
              user: 'ObjectId User'
            }
          ]
        }
      ]
    };
  }
  render() {
    return (
      <div className='post-item-container flex-hor-center'>
        {this.state.posts.map(post => (
          <PostItem
            key={post._id}
            postId={post._id}
            user={post.user}
            img={post.postImg}
            text={post.text}
            createdAt={post.createdAt}
            likes={post.likes}
            dislikes={post.dislikes}
          />
        ))}
      </div>
    );
  }
}

export default PostContainer;
