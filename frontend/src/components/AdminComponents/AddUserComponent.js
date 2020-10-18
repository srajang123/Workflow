import React, { Component, Fragment } from 'react';
import { Spinner, Breadcrumb, BreadcrumbItem, Button, Col, Label, Form, FormGroup, Input, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

import AdminHeader from './AdminHeaderComponent';

import axios from "axios"

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            mail: "",
            role: "NA",
            submit: "",
            touched: {
                firstName: false,
                lastName: false,
                mail: false,
                role: false
            },
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })
    }

    validateState() {
        const errors = {
            firstName: "",
            lastName: "",
            mail: "",
            role: "",
            submit: ""
        };
        if (this.state.touched.firstName && this.state.firstName === "") errors.firstName = "This is required field";
        if (this.state.touched.lastName && this.state.lastName === "") errors.lastName = "This is required field";
        if (this.state.touched.role && this.state.role === "NA") errors.role = "This is required field";
        var mailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (this.state.touched.mail && !mailPattern.test(this.state.mail)) {
            errors.mail = "Please enter valid email addressed";
        }
        return errors;
    }

    handleSubmit = async (event) => {

        event.preventDefault();
        const errors = this.validateState();

        if (this.state.touched.firstName && this.state.touched.lastName && this.state.touched.role && this.state.touched.mail && errors.firstName === "" && errors.lastName === "" && errors.mail === "" && errors.role === "") {

            if (!window.confirm("Are you sure?")) return;

            this.setState({
                submit: "",
                loading: true
            });
            axios.post(process.env.REACT_APP_LOGIN_API+'/admin/create', {
                fname: this.state.firstName,
                lname: this.state.lastName,
                mail: this.state.mail,
                role: this.state.role
            }).then((response) => {
                this.setState({
                    submit: "User Created Successfully",
                    loading: false,
                });
            }).catch((err) => {
                console.log(err);
                this.setState({
                    submit: "Error Occured",
                    loading: false,
                })
            });
        } else {
            this.setState({
                submit: "Fill the form correctly"
            });
        }
    }
    render() {
        const errors = this.validateState();
        const Nfeedback = {
            color: 'red',
            fontSize: '12px',
            margin: 2
        };
        const Pfeedback = {
            color: this.state.submit === 'User Created Successfully' ? "green" : "red",
            fontSize: '12px',
            margin: 2
        };
        let submitStatus = [];
        if (this.state.loading)
            submitStatus.push(<Spinner style={{ width: '2rem', height: '2rem' }} />);
        else
            submitStatus.push(<p style={Pfeedback}>{this.state.submit}</p>);
        return (
            <Fragment>
                <AdminHeader />
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/admin"><i className="fa fa-user fa-sm"></i> Admin</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Create User</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Create User</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="container" style={{ marginLeft: 10, marginTop: 30 }}>
                        <div className="row">
                            <div className="col">
                                <Form onSubmit={this.handleSubmit} autoComplete="off">
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="firstName">First Name<span style={{ color: 'red' }}> *</span></Label>
                                                <Input type="text" name="firstName" id="firstName"
                                                    value={this.state.firstName}
                                                    onBlur={this.handleBlur('firstName')}
                                                    onChange={this.handleInputChange}
                                                    placeholder="first name"
                                                />
                                                <p style={Nfeedback}>{errors.firstName}</p>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="lastName">Last Name<span style={{ color: 'red' }}> *</span></Label>
                                                <Input type="text" name="lastName" id="lastName"
                                                    value={this.state.lastName}
                                                    onBlur={this.handleBlur('lastName')}
                                                    onChange={this.handleInputChange}
                                                    placeholder="last name"
                                                />
                                                <p style={Nfeedback}>{errors.lastName}</p>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="role">Role<span style={{ color: 'red' }}> *</span></Label>
                                                <Input type="select" name="role" id="role"
                                                    value={this.state.role}
                                                    onBlur={this.handleBlur('role')}
                                                    onChange={this.handleInputChange}
                                                >
                                                    <option>NA</option>
                                                    <option>admin</option>
                                                    <option>requester</option>
                                                    <option>approver</option>
                                                </Input>
                                                <p style={Nfeedback}>{errors.role}</p>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="mail">Email<span style={{ color: 'red' }}> *</span></Label>
                                                <Input type="email" name="mail" id="mail"
                                                    value={this.state.mail}
                                                    onBlur={this.handleBlur('mail')}
                                                    onChange={this.handleInputChange}
                                                    placeholder="email"
                                                />
                                                <p style={Nfeedback}>{errors.mail}</p>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup row>
                                        <Col style={{ marginTop: 20 }}>
                                            <Button type="submit" color="primary">
                                                Create User
                                            </Button><br />
                                            {submitStatus}
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

export default AddUser;