import React, { Component, Fragment } from 'react';
import { Jumbotron, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import RequesterHeader from './RequesterHeaderComponent';

class Requester extends Component {
    render() {
        return (
            <Fragment>
                <RequesterHeader />
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home"><i className="fa fa-home fa-sm"></i> Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active> Requester</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Requester Dashboard</h3>
                            <hr />
                        </div>
                    </div>
                    <Jumbotron>
                        <div className="container">
                            <div className="row row-header">
                                <div className="col-12 col-sm-6">
                                    <h1>Welcome.. Requester</h1>
                                    <p>
                                        Requester can raise request for approval by chosing product and approver
                                        by adding necessary work notes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Jumbotron>
                    <div className="container">
                        <div className="row">
                            {/* <h1>Requester Page</h1> */}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Requester;