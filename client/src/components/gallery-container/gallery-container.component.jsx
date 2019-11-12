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
    return (
      <div className='gallery-main-content card flex-hor-center'>
        <div className='main-gallery-header'>
          <div className='flex-wrap-center upload-form'>
            <input type='text' placeholder='Image path' />
            <button className='btn btn-transparent select-btn'>&#x21ea;</button>
            <button className='btn btn-grad'>&#x27A4;</button>
          </div>
        </div>
        <div className='main-gallery-container flex-wrap-center'>
          <GalleryItem />
        </div>
      </div>
    );
  }
}

export default GalleryContainer;
