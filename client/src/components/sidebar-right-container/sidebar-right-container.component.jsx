import React from 'react';

import './sidebar-right-container.styles.scss';

//Components

import GalleryItem from '../gallery-item/gallery-item.component';

class SidebarRight extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className='right-sidebar'>
        <div className='sidebar-header'>
          <p>{this.props.title}</p>
        </div>
        <div className='sidebar-container flex-wrap-center'>
          <GalleryItem location={'sidebar'} />
        </div>
      </div>
    );
  }
}

export default SidebarRight;
