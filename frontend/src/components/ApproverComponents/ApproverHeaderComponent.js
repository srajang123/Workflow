import React, { Component, Fragment } from 'react';
import {
    Navbar, NavbarBrand, NavbarToggler, Collapse,
    Nav, NavbarText, NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import history from '../history';
class ApproverHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            activeUser: ""
        }
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    componentDidMount() {
        var authData = Cookies.getJSON("activeUser");
        if (authData.role !== "approver") {
            history.push("/home");
        }
        this.setState({
            activeUser: authData.mail
        })
    }

    handleSubmit(values) {
        console.log('State : ' + JSON.stringify(values));
        alert('state' + JSON.stringify(values));
    }

    logout = () => {
        Cookies.remove('activeUser');
        history.push('/home');
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
                                    <Link to="/approver/active"><i className="fa fa-bell fa-sm"></i>  Active</Link>
                                </NavItem>
                                <NavItem style={{ margin: 10 }}>
                                    <Link to="/approver/all"><i className="fa fa-history fa-sm"></i>  All</Link>
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

export default ApproverHeader;