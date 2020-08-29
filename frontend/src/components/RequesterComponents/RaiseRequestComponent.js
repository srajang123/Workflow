import React, { Component,Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Col, Label, Form, FormGroup, Input, Row} from 'reactstrap';
import { Link } from 'react-router-dom';

import RequesterHeader from './RequesterHeaderComponent';

import Cookies from "js-cookie";

import axios from "axios"

class RaiseRequest extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            productId : "NA",
            productName : "",
            approverId :"NA",
            activeUserMail : "",
            approverFName : "",
            approverLName : "",
            requesterNote : "",
            confirm : false,
            submit : "",
            touched : {
                productId : false,
                approverId : false,
                requesterNote : false,
                confirm : false,
            },
            fetchData : {
                products : "",
                approvers : ""
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount = () => {
        // Fetching all approvers, products
        var activeUserMail = Cookies.getJSON('activeUser').mail;
        this.setState({
            activeUserMail : activeUserMail
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        if(name==="confirm") {
            this.setState({
                confirm : !this.state.confirm
            })
        }
        else {
            this.setState({
                 [name] : value
            });
        }
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched : { ...this.state.touched, [field] : true }
        })
    }

    validateState() {
        const errors = {
            approverId : "",
            productId: "",
            submit : "",
            confirm : ""
        };
        if(this.state.touched.productId && this.state.productId==="NA")errors.productId = "This is required field";
        if(this.state.touched.approverId && this.state.approverId==="NA")errors.approverId = "This is required field";
        if(this.state.touched.requesterNote && this.state.requesterNote==="")errors.requesterNote = "This is required field";
        if(this.state.touched.confirm && !this.state.confirm)errors.confirm = "This is required field";
        return errors;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log("hello");
        let clientSideVerification = this.state.touched.productId && this.state.touched.approverId && this.state.requesterNote && this.state.touched.confirm;
        const errors = this.validateState();
        if(clientSideVerification) {
            if(errors.productId!=="")clientSideVerification=false;
            if(errors.approverId!=="")clientSideVerification=false;
            if(errors.confirm!=="")clientSideVerification=false;

            if(clientSideVerification) {                
                
                /// Ready to post request to server




                this.setState({
                    submit : "Request Submitted Successfully"
                });
                
            } else {
                this.setState({
                    submit : "Fill the form correctly"    
                });
            }
        } else {
            this.setState({
                submit : "Fill the form correctly"    
            });
        }
    }
    render() {
        const errors = this.validateState();
        const feedback = {
            color : 'red',
            fontSize : '12px',
            margin : 2
        }
        return (
            <Fragment>
                <RequesterHeader />
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to ="/requester"><i className="fa fa-user fa-sm"></i> Requester</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Raise Request</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Raise Request</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="container" style={{marginLeft : 10, marginTop : 30}}>
                        <div className="row">
                            <div className="col">
                                <Form onSubmit={this.handleSubmit} autoComplete="off">
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="productId">Product ID<span style={{color:'red'}}> *</span></Label>
                                                <Input type="select" name="productId" id="productId"
                                                    value={this.state.productId}
                                                    onBlur = {this.handleBlur('productId')}
                                                    onChange={this.handleInputChange} 
                                                >
                                                <option>NA</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                </Input>
                                                <p style={feedback}>{errors.productId}</p>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="productName">Product Name</Label>
                                                <Input type="text" name="productName" id="productName" value={this.state.productName} disabled/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <FormGroup>
                                                <Label for="requesterNote">Requester Note<span style={{color:'red'}}> *</span></Label>
                                                <Input type="textarea" name="requesterNote" id="requesterNote" rows="6"
                                                value={this.state.requesterNote}
                                                onChange={this.handleInputChange} 
                                                onBlur = {this.handleBlur('requesterNote')}
                                                />
                                                <p style={feedback}>{errors.requesterNote}</p>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="approverId">Approver ID<span style={{color:'red'}}> *</span></Label>
                                                <Input type="select" name="approverId" id="approverId"
                                                value={this.state.approverId}
                                                onBlur = {this.handleBlur('approverId')}
                                                onChange={this.handleInputChange} 
                                                >
                                                <option>NA</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                </Input>
                                                <p style={feedback}>{errors.approverId}</p>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="approverFName">Approver First Name</Label>
                                                <Input type="text" name="approverFName" id="approverFName" value={this.state.approverFName} disabled/>
                                            </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                            <FormGroup>
                                                <Label for="approverLName">Approver Last Name</Label>
                                                <Input type="text" name="approverLName" id="approverLName" value ={this.state.approverLName} disabled/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup check>
                                        <Input type="checkbox" name="confirm" id="confirm"
                                        value = {this.state.confirm}
                                        onBlur = {this.handleBlur('confirm')}
                                        onChange = {this.handleInputChange} 
                                        />
                                        <Label for="confirm" check>Confirm Submit<span style={{color:'red'}}> *</span></Label>
                                        <p style={feedback}>{errors.confirm}</p>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col style={{marginTop : 20}}>
                                            <Button type="submit" color="primary">
                                                Raise Request
                                            </Button>
                                            <p style={feedback}>{this.state.submit}</p>
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

export default RaiseRequest;