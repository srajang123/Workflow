import React, { Component, Fragment } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarText,
  NavbarToggler, Collapse, NavItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import history from "../history";

class AdminHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isOpen : false,
    }
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    var authData = JSON.parse(Cookies.get("activeUser"));
    if(authData.roll!=="admin") {
      history.push("/home");  
    }
  }

  toggle = () => {
      this.setState({
          isOpen : !this.state.isOpen
      });
  }

  render() {
    return (
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
                          <Link to="/admin/add"><i className="fa fa-plus-circle fa-sm"></i>  Add</Link>
                          </NavItem>
                          <NavItem style={{margin : 10}}>
                          <Link to="/admin/update"><i className="fa fa-edit fa-sm"></i>  Update</Link>
                          </NavItem>
                          <NavItem style={{margin : 10}}>
                          <Link to="/admin/view"><i className="fa fa-eye fa-sm"></i>  View</Link>
                          </NavItem>
                          <NavItem style={{margin : 10}}>
                          <Link to="/home"><i className="fa fa-sign-out fa-sm"></i>  Logout</Link>
                          </NavItem>
                      </Nav>
                      <NavbarText>TCS PROJECT</NavbarText>
                  </Collapse>
              </div>
          </Navbar>
        </Fragment>
    );
  }
}
export default AdminHeader;