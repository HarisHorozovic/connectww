import React from 'react';

import './overview-container.styles.scss';

// Components
import OverviewItem from '../overview-item/overview-item.component';

class OverviewContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className='overview-main-content flex-hor-center'>
        <OverviewItem select='info' />
        <OverviewItem select='exp' />
        <OverviewItem select='edu' />
      </div>
    );
  }
}

export default OverviewContainer;
