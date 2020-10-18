import React, { Component, Fragment } from 'react';
import {
    Spinner, Row, Col, Card, Button, CardHeader,
    CardBody, CardText, ListGroup, ListGroupItem,
    Modal, ModalHeader, ModalBody, ModalFooter, Input, Label
} from 'reactstrap';

import axios from 'axios';

class SingleCardBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            approverNote: "",
            error: "",
            disable: false,
            loading : false
        }
        this.toggle = this.toggle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.approved = this.approved.bind(this);
        this.rejected = this.rejected.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }

    approved = async (request) => {
        if (this.state.approverNote === "") {
            this.setState({
                error: "Review note is required field"
            });
        } else {
            this.setState({
                loading : true
            })
            axios.post(process.env.REACT_APP_LOGIN_API+'/approver/request/action', {
                status: "approved",
                requestId: request.request_id,
                approverNote: this.state.approverNote
            })
                .then((response) => {
                    this.setState({
                        error: "Request Approved",
                        disable: true,
                        loading : false
                    });
                })
                .catch((error) => {
                    this.setState({
                        error: "Server Error",
                        loading : false
                    });
                });
        }

    }

    rejected = async (request) => {
        if (this.state.approverNote === "") {
            this.setState({
                error: "Review note is required field",
            });
        } else {
            this.setState({
                loading : true
            })
            axios.post('http://localhost:5000/approver/request/action', {
                status: "rejected",
                requestId: request.request_id,
                approverNote: this.state.approverNote
            })
                .then((response) => {
                    this.setState({
                        error: "Request Rejected",
                        disable: true,
                        loading : false
                    });
                })
                .catch((error) => {
                    this.setState({
                        error: "Server Error",
                        loading : false
                    });
                });
        }
    }

    render() {
        let feedback = [];

        if(this.state.loading) 
            feedback.push(<Spinner style={{ width: '2rem', height: '2rem' }} />);
        else 
            feedback.push(<p><span span style={this.state.error === "Request Approved" || this.state.error === "Request Rejected" ? { color: 'green' } : { color: 'red' }}>{this.state.error}</span></p>);
        

        return (
            <Col sm="6">
                <Card body>
                    <CardHeader tag="h6">Request ID - #{this.props.item.request_id} {this.props.item.approver_comment === null ? "Active" : "Reviewed"}</CardHeader>
                    <CardBody>
                        <CardText>
                            <ListGroup>
                                <ListGroupItem color="info" style={{ display: this.props.toggle.requester }}>Approver ID : {this.props.item.approver_id}</ListGroupItem>
                                <ListGroupItem color="info" style={{ display: this.props.toggle.approver }}>Requester ID : {this.props.item.requester_id}</ListGroupItem>
                                <ListGroupItem color="info">Product ID : {this.props.item.product_id}</ListGroupItem>
                                <ListGroupItem color="info" style={{ display: this.props.toggle.approver }}>Requester Comment : {this.props.item.requester_comment}</ListGroupItem>
                                <ListGroupItem color="info" style={{ display: this.props.toggle.requester }}>Approver Comment : {this.props.item.approver_comment}</ListGroupItem>
                                <ListGroupItem color="info" style={{ display: this.props.toggle.requester }}>Your Comment : {this.props.item.requester_comment}</ListGroupItem>
                                <ListGroupItem color="info" style={{ display: this.props.toggle.approver }}>Your Comment : {this.props.item.approver_comment}</ListGroupItem>
                            </ListGroup>
                        </CardText>
                        <Button onClick={() => { this.toggle(this.props.item) }} style={{ display: this.props.toggle.all ? "block" : "none" }} color="primary">Review</Button>
                    </CardBody>
                </Card>
                <Modal isOpen={this.state.modal} toggle={this.state.toggle} backdrop="static" keyboard={true}>
                    <ModalHeader toggle={this.state.toggle}>Request ID - #{this.props.item.request_id}</ModalHeader>
                    <ModalBody>
                        <Label for="approverNote"><h6>Review Note - <span style={{ color: 'red' }}> *</span></h6>{feedback}</Label>
                        <Input type="textarea" name="approverNote" id="approverNote" rows="6"
                            value={this.state.approverNote}
                            onChange={this.handleInputChange}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => { this.approved(this.props.item) }} disabled={this.state.disable}>Approved</Button>{' '}
                        <Button color="danger" onClick={() => { this.rejected(this.props.item) }} disabled={this.state.disable}>Rejected</Button>{' '}
                        <Button color="primary" onClick={() => { this.toggle(this.props.item) }}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Col>
        );
    }
}

class ViewRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "",
            role: "",
            toggle: {
                requester: "none",
                approver: "none",
                all: false,
            }
        }
    }

    componentDidMount() {
        this.props.data.then((res) => {
            console.log(res);
            if (this.props.role === "requester") {
                this.setState({
                    data: res,
                    role: this.props.role,
                    toggle: {
                        requester: "block",
                        approver: "none",
                        all: this.props.all
                    }
                });
            } else if (this.props.role === "approver") {
                this.setState({
                    data: res,
                    role: this.props.role,
                    toggle: {
                        requester: "none",
                        approver: "block",
                        all: this.props.all
                    }
                })
            }
        });
    }

    render() {
        let cards = [];
        if (this.state.data === "") {
            cards.push(<Spinner style={{ width: '3rem', height: '3rem' }} />)
        }
        else {
            for (let i = 0; i < this.state.data.length - 1; i += 2) {
                let item1 = this.state.data[i];
                let item2 = this.state.data[i + 1];
                cards.push(
                    <Row>
                        <SingleCardBody {...this.state} item={item1} />
                        <SingleCardBody {...this.state} item={item2} />
                    </Row>
                )
            }
            if (this.state.data.length % 2) {
                let item = this.state.data[this.state.data.length - 1];
                cards.push(
                    <Row>
                        <SingleCardBody {...this.state} item={item} />
                    </Row>
                )
            }
            if(cards.length===0) {
                cards.push(<h6>No Request Fetched !</h6>);
            }
        }

        return (
            <Fragment>
                {cards}
            </Fragment>
        );
    }
}

export default ViewRequest;