import React, { Component, Fragment } from 'react';
import {
    Nav, Navbar, NavbarBrand, NavbarText,
    NavbarToggler, Collapse, NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import history from "../history";

class AdminHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            activeUser: ""
        }
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        var authData = Cookies.getJSON("activeUser");
        if (authData.role !== "admin") {
            history.push("/home");
        }
        this.setState({
            activeUser: authData.mail
        });
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout = () => {
        Cookies.remove('activeUser');
        history.push("/home");
    }

    render() {
        return (
            <Fragment>
                <Navbar style={{ backgroundColor: "black" }} dark expand="md">
                    <div className="container">
                        <NavbarBrand>
                            Product Sample Approval Workflow
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem style={{ margin: 10 }}>
                                    <Link to="/admin/add"><i className="fa fa-plus-circle fa-sm"></i>  Add</Link>
                                </NavItem>
                                <NavItem style={{ margin: 10 }}>
                                    <Link to="/admin/view"><i className="fa fa-eye fa-sm"></i>  View</Link>
                                </NavItem>
                                <NavItem style={{ margin: 10 }}>
                                    <Link onClick={this.logout}><i className="fa fa-sign-out fa-sm"></i>  Logout</Link>
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