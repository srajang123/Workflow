import React, { Fragment, useState } from 'react';
import { Jumbotron, Nav, Navbar, NavbarText, NavbarBrand, Collapse, 
  NavbarToggler, NavItem  } from 'reactstrap';
import {Link} from 'react-router-dom'
function Home() {

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
                <NavItem style={{margin : 10}}>
                <Link to="/login"><i className="fa fa-sign-in fa-sm"></i> Login</Link>
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
              <h1>Welcome..</h1>
              <p>
                For marketing of a product, Sales Representative to raise a request to seek approval before
                provding sample product to their customers. System should provide features wherein sales Rep
                can raise a request and it is approved/rejected by the sample admin. Approver can approve or
                reject the request based on the details mentioned in request.
              </p>
            </div>
          </div>
        </div>
      </Jumbotron>
      <div className="container">
        <div className="row">
          <h1>Home Page</h1>
        </div>
      </div>
    </div>
  );
}
export default Home;