import React, { Fragment } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

function Header() {
  return (
    <Fragment>
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">
            Product Sample Approval Workflow
          </NavbarBrand>
        </div>
      </Navbar>
    </Fragment>
  );
}
export default Header;