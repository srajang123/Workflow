import React, { Component,Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Label, Navbar, NavbarBrand, NavbarText} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


// validations
const required = (val) => val && val.length;
const minLength = (len) => (val) => (val)  && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+a-z]+@[A-Z0-9a-z.-]+\.[A-Z]{2,4}$/i.test(val);

class Login extends Component {
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
            <div>
                <Fragment>
                    <Navbar style={{backgroundColor : "black"}} dark expand="md">
                        <div className="container">
                            <NavbarBrand>
                                Product Sample Approval Workflow
                            </NavbarBrand>
                            {/* <NavbarToggler onClick={this.toggle} />
                             <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="mr-auto" navbar>
                                    <NavItem style={{margin : 5}}>
                                        <Link to="/home">Home</Link>
                                    </NavItem>
                                </Nav>
                            </Collapse> */}
                            <NavbarText>TCS PROJECT</NavbarText>
                        </div>
                    </Navbar>
                </Fragment>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to ="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Login</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Login</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row row-content">
                        <div className="col-12 col-md-9">
                            <LocalForm onSubmit = {(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="email" md={2}>
                                        Email<span style={{color : "red"}}> *</span>
                                    </Label>
                                    <Col md={10}>
                                        <Control.text
                                            model=".email" id="email" name="email"
                                            placeholder="email" className="form-control"
                                            validators = {{
                                                required, validEmail
                                            }}
                                            autoComplete = "off"
                                            />
                                            <Errors 
                                                className="text-danger"
                                                model=".email"
                                                show="touched"
                                                messages={{
                                                    required : "Required Field ",
                                                    validEmail : "Invalid Email Address"
                                                }} />
                                                
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="password" md={2}>
                                        Password<span style={{color : "red"}}> *</span>
                                    </Label>
                                    <Col md={10}>
                                        <Control.text
                                            model=".password" id="password" name="password"
                                            placeholder="password" className="form-control" 
                                            validators = {{
                                                required, minLength : minLength(9)
                                            }}
                                            autoComplete = "off"
                                            />
                                        <Errors 
                                                className="text-danger"
                                                model=".password"
                                                show="touched"
                                                messages={{
                                                    required : "Required Field ",
                                                    minLength : "Password must be atleast 9 characters long"
                                                }} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:10, offset:2}}>
                                        <Button type="submit" color="primary">
                                            Login
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;