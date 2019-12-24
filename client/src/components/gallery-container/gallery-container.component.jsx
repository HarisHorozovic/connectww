import React from 'react';
import { withRouter } from 'react-router-dom';

import './gallery-container.styles.scss';

//Components
import GalleryItem from '../gallery-item/gallery-item.component';

class GalleryContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    let isOtherUser = this.props.match.params.userId;
    let uploadImg = (
      <div className='main-gallery-header'>
        <div className='flex-wrap-center upload-form'>
          <input type='text' placeholder='Image path' />
          <button className='btn btn-main select-btn'>&#x21ea;</button>
          <button className='btn btn-main'>&#x27A4;</button>
        </div>
      </div>
    );
    return (
      <div className='gallery-main-content card flex-hor-center'>
        {isOtherUser ? uploadImg : null}
        <div className='main-gallery-container flex-wrap-center'>
          {isOtherUser !== undefined ? (
            <GalleryItem otherUser={false} />
          ) : (
            <GalleryItem otherUser={true} />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(GalleryContainer);
