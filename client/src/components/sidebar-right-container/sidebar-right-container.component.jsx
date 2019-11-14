import React from 'react';

import './sidebar-right-container.styles.scss';

//Components
import GalleryItem from '../gallery-item/gallery-item.component';
import JoinedGroupsContainer from '../joined-groups-container/joined-groups-container.component';
import UsersInGroupContainer from '../users-in-group-container/users-in-group-container.component';

const SidebarRight = ({ title, location }) => {
  let profileViewSidebar = (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <p>{title}</p>
      </div>
      <div className='sidebar-container flex-wrap-center'>
        <GalleryItem location={'sidebar'} />
      </div>
    </div>
  );

  let groupsPageSidebar = (
    <div className='sidebar'>
      <JoinedGroupsContainer />
      <UsersInGroupContainer />
    </div>
  );
  return (
    <div className='right-sidebar'>
      {location === 'groupspage' ? groupsPageSidebar : profileViewSidebar}
    </div>
  );
};

export default SidebarRight;
