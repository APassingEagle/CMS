import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../styles/navbar.scss'

export class NavMenu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <div className='main-heading'>On-Hand Vehicular Stock</div>
      </header>
    );
  }
}
