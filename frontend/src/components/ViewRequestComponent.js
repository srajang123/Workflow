import React, { Component, Fragment } from 'react';
import { Spinner, Row, Col, Card, Button, CardHeader, 
    CardBody, CardText ,ListGroup, ListGroupItem,
    Modal, ModalHeader, ModalBody, ModalFooter, Input, Label} from 'reactstrap';

class SingleCardBody extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modal : false,
            approverNote : "",
            touched : {
                approverNote : false,
            }
        }
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    toggle() {
        console.log(this.state.touched);
        this.setState({
            modal : !this.state.modal
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value,
       });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched : { ...this.state.touched, [field] : true }
        })
    }


    handleSubmit = async (event) => {
    }


    review(data) {
        // trigger modal here
    }

    render() {
        return(
            <Col sm="6">
                <Card body>
                    <CardHeader tag="h6">Request ID - #{this.props.item.request_id}</CardHeader>
                    <CardBody>
                        <CardText>
                            <ListGroup>
                                <ListGroupItem color="info" style={{display : this.props.toggle.requester}}>Approver ID : {this.props.item.approver_id}</ListGroupItem>
                                <ListGroupItem color="info" style={{display : this.props.toggle.approver}}>Requester ID : {this.props.item.requester_id}</ListGroupItem>
                                <ListGroupItem color="info">Product ID : {this.props.item.product_id}</ListGroupItem>
                                <ListGroupItem color="info" style={{display : this.props.toggle.approver}}>Requester Comment : {this.props.item.requester_comment}</ListGroupItem>
                                <ListGroupItem color="info" style={{display : this.props.toggle.requester}}>Approver Comment : {this.props.item.approver_comment}</ListGroupItem>
                                <ListGroupItem color="info" style={{display : this.props.toggle.requester}}>Your Comment : {this.props.item.requester_comment}</ListGroupItem>
                                <ListGroupItem color="info" style={{display : this.props.toggle.approver}}>Your Comment : {this.props.item.approver_comment}</ListGroupItem>
                            </ListGroup>
                        </CardText>
                        <Button onClick={() => {this.toggle(this.props.item)}} style={{display : this.props.toggle.approver}} color="primary">Review</Button>
                    </CardBody>
                </Card>
                <Modal isOpen={this.state.modal} toggle={this.state.toggle} backdrop="static" keyboard={true}>
                    <ModalHeader toggle={this.state.toggle}>Request ID - #{this.props.item.request_id}</ModalHeader>
                    <ModalBody>
                        <Label for="approverNote">Approver Note (200 words)<span style={{color:'red'}}> *</span></Label>
                        <Input type="textarea" name="approverNote" id="approverNote" rows="6"
                            value={this.state.approverNote}
                            onChange={this.handleInputChange} 
                            onBlur = {this.handleBlur('approverNote')}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => {this.toggle(this.props.item)}}>Approved</Button>{' '}
                        <Button color="danger" onClick={() => {this.toggle(this.props.item)}}>Rejected</Button>{' '}
                        <Button color="primary" onClick={() => {this.toggle(this.props.item)}}>Cancel</Button>
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
            data :"",
            role : "",
            toggle : {
                requester : "none",
                approver : "node",
            }
        }
    }

    componentDidMount() {
        this.props.data.then((res)=> {
            if(this.props.role==="requester") {
                this.setState({
                    data : res,
                    role : this.props.role,
                    toggle : {
                        requester : "block",
                        approver : "none"
                    }
                })
            } else if(this.props.role==="approver") {
                this.setState({
                    data : res,
                    role : this.props.role,
                    toggle : {
                        requester : "none",
                        approver : "block"
                    }
                })
            } 
        });
    }

    render() {
        let cards = [];
        if(this.state.data==="") {
            cards.push(<Spinner style={{ width: '3rem', height: '3rem' }} />)
        }
        else {
            for(let i=0;i<this.state.data.length-1;i+=2) {
                let item1 = this.state.data[i];
                let item2 = this.state.data[i+1];    
                cards.push(
                    <Row>
                        <SingleCardBody {...this.state} item = {item1}/>
                        <SingleCardBody {...this.state} item = {item2}/>
                    </Row>    
                ) 
            }
            if(this.state.data.length%2){
                let item = this.state.data[this.state.data.length-1];
                cards.push(
                    <Row>
                        <SingleCardBody {...this.state} item = {item} />
                    </Row>
                )
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