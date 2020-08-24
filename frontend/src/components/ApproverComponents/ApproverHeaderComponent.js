import React, { Component, Fragment } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse,
 Nav, NavbarText, NavItem} from 'reactstrap';
import { Link } from 'react-router-dom';

class ApproverHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen : false
        }
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        });
    }

    handleSubmit(values) {
        console.log('State : ' + JSON.stringify(values));
        alert('state' + JSON.stringify(values));
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
                                <Link to="/approver/active"><i className="fa fa-bell fa-sm"></i>  Active</Link>
                                </NavItem>
                                <NavItem style={{margin : 10}}>
                                <Link to="/approver/all"><i className="fa fa-history fa-sm"></i>  All</Link>
                                </NavItem>
                                {/* <NavItem style={{margin : 5}}>
                                    <Link to="/">Remove</Link>
                                </NavItem> */}
                                <NavItem style={{margin : 10}}>
                                <Link to="/"><i className="fa fa-sign-out fa-sm"></i>  Logout</Link>
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