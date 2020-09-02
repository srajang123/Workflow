import React, { Fragment, Component } from 'react';
import {
    Nav, Navbar, NavbarText, NavbarBrand, Collapse,
    NavbarToggler, NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

import history from './history';
import Cookies from 'js-cookie';

class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            activeUser: ""
        }
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    async componentDidMount() {
        var authData = await Cookies.getJSON("activeUser");
        if (authData) {
            if (authData.role !== "approver") {
                history.push("/home");
            }
            this.setState({
                activeUser: authData
            });
        }
    }

    logout = () => {
        Cookies.remove('activeUser');
        history.push('/');
    }

    render() {
        let action = [];
        if (this.state.activeUser.role === "admin") {
            action.push(
                <Nav className="mr-auto" navbar>
                    <NavItem style={{ margin: 10 }}>
                        <Link to="/admin">Admin</Link>
                    </NavItem>
                    <NavItem style={{ margin: 10 }}>
                        <Link onClick={this.logout}>Logout</Link>
                    </NavItem>
                </Nav>
            );
        } else if (this.state.activeUser.role === 'requester') {
            action.push(
                <Nav className="mr-auto" navbar>
                    <NavItem style={{ margin: 10 }}>
                        <Link to="/requester">Requester</Link>
                    </NavItem>
                    <NavItem style={{ margin: 10 }}>
                        <Link onClick={this.logout}>Logout</Link>
                    </NavItem>
                </Nav>
            );
        } else if (this.state.activeUser.role === 'approver') {
            action.push(
                <Nav className="mr-auto" navbar>
                    <NavItem style={{ margin: 10 }}>
                        <Link to="/approver">Approver</Link>
                    </NavItem>
                    <NavItem style={{ margin: 10 }}>
                        <Link onClick={this.logout}>Logout</Link>
                    </NavItem>
                </Nav>
            );
        } else {
            action.push(
                <Nav className="mr-auto" navbar>
                    <NavItem >
                        <Link to="/login">Login</Link>
                    </NavItem>
                </Nav>
            );
        }
        return (
            <Fragment>
                <Navbar style={{ backgroundColor: "black" }} dark expand="md">
                    <div className="container">
                        <NavbarBrand>
                            Product Sample Approval Workflow
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            {action}
                            <NavbarText>TCS PROJECT</NavbarText>
                        </Collapse>
                    </div>
                </Navbar>
            </Fragment>
        );
    }
}

export default HomeHeader;