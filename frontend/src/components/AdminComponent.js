import React, { Component, Fragment } from 'react';
import { Jumbotron, Nav, Navbar, NavbarBrand, NavbarText,
  NavbarToggler, Collapse, NavItem} from 'reactstrap';
import { Link } from 'react-router-dom';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isOpen : false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
      this.setState({
          isOpen : !this.state.isOpen
      });
  }

  render() {
    return (
      <Fragment>
        <Fragment>
          <Navbar style={{backgroundColor : "black"}} dark expand="md">
              <div className="container">
                  <NavbarBrand>
                      Product Sample Approval Workflow
                  </NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="mr-auto" navbar>
                          {/* Button will replaced Link later to clear the cookies and redirecting to the main page */}
                          <NavItem style={{margin : 10}}>
                          <i className="fa fa-plus-circle fa-sm" style={{color : "white"}}></i><Link to="/">  Add</Link>
                          </NavItem>
                          <NavItem style={{margin : 10}}>
                          <i className="fa fa-edit fa-sm" style={{color : "white"}}></i><Link to="/">  Update</Link>
                          </NavItem>
                          {/* <NavItem style={{margin : 5}}>
                              <Link to="/">Remove</Link>
                          </NavItem> */}
                          <NavItem style={{margin : 10}}>
                          <i className="fa fa-eye fa-sm" style={{color : "white"}}></i><Link to="/">  View</Link>
                          </NavItem>
                          <NavItem style={{margin : 10}}>
                          <i className="fa fa-sign-out fa-sm" style={{color : "white"}}></i><Link to="/">  Logout</Link>
                          </NavItem>
                      </Nav>
                      <NavbarText>TCS PROJECT</NavbarText>
                  </Collapse>
              </div>
          </Navbar>
        </Fragment>
        <Fragment>
          <Jumbotron>
            <div className="container">
              <div className="row row-header">
                <div className="col-12 col-sm-6">
                  <h1>Welcome.. Admin</h1>
                  <p>
                    Admin can manage users through<br />
                    view, edit, delete, activate, deactivate rights on users.
                  </p>
                </div>
              </div>
            </div>
          </Jumbotron>
          <div className="container">
            <div className="row">
              <h1>Admin Page</h1>
            </div>
          </div>
        </Fragment>
      </Fragment>
    );
  }
}
export default Admin;