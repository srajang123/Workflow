import React, { Component,Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Label, Form ,FormGroup, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import HeaderComponent from './HeaderComponent';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            touched : {
                email : false,
                password : false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount = () => {
        console.log(this.props.activeUser);
    }

    

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched : { ...this.state.touched, [field] : true }
        })
    }

    validateState() {
        const errors = {
            email : "",
            password : ""
        };
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(this.state.touched.email && !emailPattern.test(this.state.email)) {
            errors.email = "Please enter valid email addressed";
        }
        if(this.state.touched.password && this.state.password.length<8)
            errors.password = "Password length must be 8 characters atleast";

        return errors;
    }
    

    // handleSubmit(values) {
    //     console.log('State : ' + JSON.stringify(values));
    //     alert('state' + JSON.stringify(values));
    // }

    handleSubmit = async (event) => {
        event.preventDefault();

        var clientSideVerification = this.state.touched.email && this.state.touched.password;

        if(clientSideVerification) {
            const errors = this.validateState;
            if(errors.email==="")clientSideVerification=false;
            else if(errors.password==="")clientSideVerification=false;
        }

        if(clientSideVerification) {
            // ready to request server
            if(!window.confirm("Are you sure?"))return;
            alert(this.state.email + " " + this.state.password);
        }

    }

    render() {

        const errors = this.validateState();
        const feedback = {
            color : 'red',
            fontSize : '12px'
        }

        return (
            <Fragment>
                <HeaderComponent />
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to ="/home"><i className="fa fa-user fa-sm"></i> Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Login</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Login</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="container" style={{marginLeft : 10, marginTop : 30}}>
                        <div className="row">
                            <div className="col">
                                <Form onSubmit={this.handleSubmit} autoComplete="off">
                                    {/* Input type hidden to avoid autocomplete by browser */}
                                    {/* <Input type="hidden" value="dummy" /> */}
                                    <FormGroup row>
                                        <Label md={2}>Email<span style={{color:'red'}}> *</span></Label>
                                            <Col>
                                                <Input type="email" id="email" name="email"
                                                    placeholder="Email"
                                                    value={this.state.email}
                                                    onChange={this.handleInputChange} 
                                                    onBlur = {this.handleBlur('email')} />
                                                    <p style={feedback}>{errors.email}</p>
                                            </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label md={2}>Password<span style={{color:'red'}}> *</span></Label>
                                        <Col>
                                            <Input type="password" id="password" name="password" 
                                            placeholder="Password" 
                                            value={this.state.password1}
                                            onChange={this.handleInputChange}
                                            onBlur = {this.handleBlur('password')} />
                                            <p style={feedback}>{errors.password}</p>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md={{size: 10, offset: 2}}>
                                            <Button type="submit" color="primary">
                                                login
                                            </Button>
                                        </Col>
                                    </FormGroup>

                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Login;