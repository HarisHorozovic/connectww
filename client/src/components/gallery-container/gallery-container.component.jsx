import React from 'react';

import './gallery-container.styles.scss';

//Components
import GalleryItem from '../gallery-item/gallery-item.component';

class GalleryContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    let isOtherUser = this.props.match;
    let uploadImg = (
      <div className='main-gallery-header'>
        <div className='flex-wrap-center upload-form'>
          <input type='text' placeholder='Image path' />
          <button className='btn btn-transparent select-btn'>&#x21ea;</button>
          <button className='btn btn-grad'>&#x27A4;</button>
        </div>
      </div>
    );
    return (
      <div className='gallery-main-content card flex-hor-center'>
        {isOtherUser !== undefined ? null : uploadImg}
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

export default GalleryContainer;
