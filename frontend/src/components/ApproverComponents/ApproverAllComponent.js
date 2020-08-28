import React, { Component, Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import ViewRequest from '../ViewRequestComponent';
import ApproverHeader from './ApproverHeaderComponent';

class ApproverAllRequest extends Component {
    render() {
        return (
            <Fragment>
                <ApproverHeader />
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to ="/approver"><i className="fa fa-user fa-sm"></i> Approver</Link></BreadcrumbItem>
                            <BreadcrumbItem active>View All Request</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>All Request</h3>
                            <hr />
                        </div>
                    </div>
                    <ViewRequest />
                </div>
            </Fragment>
        );
    }
}

export default ApproverAllRequest;