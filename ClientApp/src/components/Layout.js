import React, { Component } from 'react';
import ManageStock from './ManageStock';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  
  render () {
    return (
      <div>
        <NavMenu />
        <ManageStock />
      </div>
    );
  }
}
