import React, { Component, Fragment } from 'react';
import { Spinner, Row, Col, Card, Button, CardHeader, CardBody, CardText ,ListGroup, ListGroupItem} from 'reactstrap';

// It will receive data in props for which request to show

class SingleCardBody extends Component{
    constructor(props) {
        super(props);
        this.review = this.review.bind(this);
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
                                <ListGroupItem color="success" style={{display : this.props.toggle.requester}}>Approver ID : {this.props.item.approver_id}</ListGroupItem>
                                <ListGroupItem color="success" style={{display : this.props.toggle.approver}}>Requester ID : {this.props.item.requester_id}</ListGroupItem>
                                <ListGroupItem color="info">Product ID : {this.props.item.product_id}</ListGroupItem>
                                <ListGroupItem color="warning" style={{display : this.props.toggle.approver}}>Requester Comment : {this.props.item.requester_comment}</ListGroupItem>
                                <ListGroupItem color="warning" style={{display : this.props.toggle.requester}}>Approver Comment : {this.props.item.approver_comment}</ListGroupItem>
                                <ListGroupItem color="danger" style={{display : this.props.toggle.requester}}>Your Comment : {this.props.item.requester_comment}</ListGroupItem>
                                <ListGroupItem color="danger" style={{display : this.props.toggle.approver}}>Your Comment : {this.props.item.approver_comment}</ListGroupItem>
                            </ListGroup>
                        </CardText>
                        <Button onClick={() => {this.review(this.props.item)}} style={{display : this.props.toggle.approver}} color="primary">Review</Button>
                    </CardBody>
                </Card>
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
            } else {
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