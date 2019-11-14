import React from 'react';

import './groups-item.styles.scss';

const GroupItem = ({
  location,
  groupName,
  joinGroup,
  leaveGroup,
  openGroupChat
}) => {
  return (
    <div className='groups-item flex-wrap-center' onClick={openGroupChat}>
      <div className='group-info flex-hor-center'>
        <span>{groupName}</span>
      </div>
      <div className='btn-container group-buttons flex-wrap-center'>
        {location === 'joingroups' ? (
          <span onClick={joinGroup} className='btn btn-green'>
            &#x2714; Join
          </span>
        ) : location === 'ingroup' ? (
          <div className='btn-container group-buttons flex-wrap-center'>
            <span onClick={leaveGroup} className='btn btn-red'>
              &#x2718; Leave
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GroupItem;
