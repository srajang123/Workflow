import React, { Component, Fragment } from 'react';
import { Spinner, Row, Col, Card, CardHeader, Breadcrumb, BreadcrumbItem,
    CardBody, CardText ,ListGroup, ListGroupItem, Button
    } from 'reactstrap';

import {Link} from 'react-router-dom';

import AdminHeader from './AdminHeaderComponent';
import axios from 'axios';

class SingleCardBody extends Component {

    constructor(props) {
        super(props);
        // this.delete = this.delete.bind(this);
        // this.switch = this.switch.bind(this);
        this.state = {
            button : false
        }
    }
    // delete() {
    //     axios.post("http://localhost:5000/admin/delete",{
    //         id : this.props.item.user_id
    //     }).then((response) => {
    //         alert("USER DELETED SUCCESSFULLY!");
    //         this.setState({
    //             button : true
    //         })
    //     })
    //     .catch((err) => {
    //         alert("Error Occured");
    //     });
    // }
    // switch() {

    // }
    render(){
        return(
            <Card body>
                <CardHeader tag="h6">User ID - #{this.props.item.user_id} {this.props.item.status}</CardHeader>
                <CardBody>
                    <CardText>
                        <ListGroup>
                            <ListGroupItem color="info">Name : {this.props.item.fname} {this.props.item.lname}</ListGroupItem>
                            <ListGroupItem color="info">Role : {this.props.item.role}</ListGroupItem>
                            <ListGroupItem color="info">Email : {this.props.item.email}</ListGroupItem>
                        </ListGroup>
                    </CardText>
                    {/* <Button onClick={() => {this.delete(this.props.item)}} color="danger" disabled={this.state.button}>Delete</Button>{' '}
                    <Button onClick={() => {this.switch(this.props.item)}} color="warning">{this.props.item.status==="active" ? "Deactivate" : "Activate"}</Button> */}
                </CardBody>
            </Card>
        );
    }
}


class ViewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : "",
            toggle : false,
        }
    }

    async componentDidMount() {
        axios.get("http://localhost:5000/admin/get").then((response) => {
            this.setState({
                data : response.data.data
            })
        })
        .catch((err) => {
            console.log(err);
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
                console.log(item1);
                console.log(item2);
                cards.push(
                    <Row>
                        <Col md={6}>
                            <SingleCardBody item = {item1}/>
                        </Col>
                        <Col md={6}>
                            <SingleCardBody item = {item2}/>
                        </Col>
                    </Row>    
                ) 
            }
            if(this.state.data.length%2){
                let item = this.state.data[this.state.data.length-1];
                console.log(item);
                cards.push(
                    <Row>
                        <Col md={6}>
                            <SingleCardBody item = {item} />
                        </Col>
                    </Row>
                )
            }
        }
        return (
            <Fragment>
                <AdminHeader />
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to ="/admin"><i className="fa fa-user fa-sm"></i> Admin</Link></BreadcrumbItem>
                            <BreadcrumbItem active>All Users</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>All Users</h3>
                            <hr />
                        </div>
                    </div>
                    {cards}
                </div>
            </Fragment>
        );
    }
}

export default ViewUser;