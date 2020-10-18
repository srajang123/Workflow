import React, { Component, Fragment } from 'react';
import { Spinner, Breadcrumb, BreadcrumbItem, Col, Label, Form, FormGroup, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import HeaderComponent from './HeaderComponent';
import history from "./history";
import Cookies from "js-cookie";

import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loginStatus: "",
            touched: {
                email: false,
                password: false
            },
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount = () => {

        var authData = Cookies.getJSON("activeUser");

        if (authData && authData.login) {
            if (authData.role === "admin") history.push("/admin");
            else if (authData.role === "requester") history.push("/requester");
            else if (authData.role === "approver") history.push("/approver");
        }

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })
    }

    validateState() {
        const errors = {
            email: "",
            password: ""
        };
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (this.state.touched.email && !emailPattern.test(this.state.email)) {
            errors.email = "Please enter valid email addressed";
        }
        if (this.state.touched.password && this.state.password.length < 8)
            errors.password = "Password length must be 8 characters atleast";

        return errors;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({
            loginStatus: "",
            loading: false
        })

        var clientSideVerification = this.state.touched.email && this.state.touched.password;

        if (clientSideVerification) {
            let errors = this.validateState();
            if (errors.email !== "") clientSideVerification = false;
            if (errors.password !== "") clientSideVerification = false;
        }

        if (clientSideVerification) {

            if (!window.confirm("Are you sure?")) return;

            console.log(this.state.email, this.state.password);
            this.setState({
                loading: true
            });

            axios.post(process.env.REACT_APP_LOGIN_API+'/login', {
                mail: this.state.email,
                password: this.state.password
            })
                .then((response) => {

                    const role = response.data.role;

                    Cookies.set("activeUser", {
                        login: response.data.login,
                        role: response.data.role,
                        mail: response.data.mail,
                    }, { expires: 1 });
                    this.setState({
                        loading: false
                    });
                    if (role === "admin") history.push("/admin");
                    else if (role === "requester") history.push("/requester");
                    else if (role === "approver") history.push("/approver");

                })
                .catch((error) => {
                    this.setState({
                        loginStatus: "login failed",
                        loading: false
                    });
                });
        } else {
            this.setState({
                loginStatus: "fill the form correctly"
            });
        }
    }

    render() {

        const errors = this.validateState();

        const feedback = {
            color: 'red',
            fontSize: '12px',
            margin: 2
        }

        let loader = [];
        if (this.state.loading) {
            loader.push(<Spinner style={{ width: '2rem', height: '2rem' }} />);
        }

        return (
            <Fragment>
                <HeaderComponent />
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home"><i className="fa fa-home fa-sm"></i> Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Login</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Login</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="container" style={{ marginLeft: 10, marginTop: 30 }}>
                        <div className="row">
                            <div className="col">
                                <Form onSubmit={this.handleSubmit} autoComplete="off">
                                    <FormGroup row>
                                        <Label md={2}>Email<span style={{ color: 'red' }}> *</span></Label>
                                        <Col>
                                            <Input type="email" id="email" name="email"
                                                placeholder="Email"
                                                value={this.state.email}
                                                onChange={this.handleInputChange}
                                                onBlur={this.handleBlur('email')} />
                                            <p style={feedback}>{errors.email}</p>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label md={2}>Password<span style={{ color: 'red' }}> *</span></Label>
                                        <Col>
                                            <Input type="password" id="password" name="password"
                                                placeholder="Password"
                                                value={this.state.password1}
                                                onChange={this.handleInputChange}
                                                onBlur={this.handleBlur('password')} />
                                            <p style={feedback}>{errors.password}</p>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md={{ size: 10, offset: 2 }}>
                                            <Button type="submit" color="primary">
                                                login
                                            </Button>
                                            <p style={feedback}>{this.state.loginStatus}</p><br />
                                            {loader}
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