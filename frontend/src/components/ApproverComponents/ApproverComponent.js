import React, { Component, Fragment } from 'react';
import { Jumbotron, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import ApproverHeader from './ApproverHeaderComponent';

class Approver extends Component {
    render() {
        return (
            <Fragment>
                <ApproverHeader />
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home"><i className="fa fa-home fa-sm"></i> Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active> Approver</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Approver Dashboard</h3>
                            <hr />
                        </div>
                    </div>
                    <Jumbotron>
                        <div className="container">
                            <div className="row row-header">
                                <div className="col-12 col-sm-6">
                                    <h1>Welcome.. Approver</h1>
                                    <p>
                                        Approver can able to approve or reject the request raise by requester by adding
                                        necessary notes and able to keep track of all the requests in which he involved.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Jumbotron>
                    <div className="container">
                        <div className="row">
                            {/* <h1>Approver Page</h1> */}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Approver;