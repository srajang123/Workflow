import React, { Fragment, useState } from 'react';
import { Jumbotron, Nav, Navbar, NavbarText, NavbarBrand, Collapse, 
  NavbarToggler, NavItem  } from 'reactstrap';
import {Link} from 'react-router-dom'

function Error() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Fragment>
        <Navbar style={{backgroundColor : "black"}} dark expand="md">
          <div className="container">
            <NavbarBrand>
              Product Sample Approval Workflow
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem style={{margin : 5}}>
                  <Link to="/home">Home</Link>
                </NavItem>
              </Nav>
              <NavbarText>TCS PROJECT</NavbarText>
            </Collapse>
          </div>
        </Navbar>
      </Fragment>
      <Jumbotron>
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>404 Not Found</h1>
              <p>Error Occured! Page could not be found</p>
            </div>
          </div>
        </div>
      </Jumbotron>
    </div>
  );
}
export default Error;