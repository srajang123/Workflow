import React, { Component, Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import ViewRequest from '../ViewRequestComponent';
import RequesterHeader from './RequesterHeaderComponent';

class RequesterAllRequest extends Component {
    render() {
        return (
            <Fragment>
                <RequesterHeader />
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to ="/requester"><i className="fa fa-user fa-sm"></i> Requester</Link></BreadcrumbItem>
                            <BreadcrumbItem active>View All Request</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>View All Request</h3>
                            <hr />
                        </div>
                    </div>
                    <ViewRequest />
                </div>
            </Fragment>
        );
    }
}
export default RequesterAllRequest;