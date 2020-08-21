import React, { Fragment, useState } from 'react';
import { Nav, Navbar, NavbarText, NavbarBrand, Collapse, 
  NavbarToggler, NavItem  } from 'reactstrap';
import {Link} from 'react-router-dom';

function Error() {
  
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
  
    return (
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
                                <Link to="/Login">Login</Link>
                            </NavItem>
                        </Nav>
                        <NavbarText>TCS PROJECT</NavbarText>
                    </Collapse>
                </div>
            </Navbar>
      </Fragment>
    );
  }
  export default Error;