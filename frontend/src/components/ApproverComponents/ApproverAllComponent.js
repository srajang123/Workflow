import React, { Component, Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import ViewRequest from '../ViewRequestComponent';
import ApproverHeader from './ApproverHeaderComponent';

import Cookies from 'js-cookie';
import axios from 'axios';

class ApproverAllRequest extends Component {

    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }

    async fetchData() {
        let activeUser = await Cookies.getJSON("activeUser");
        const allRequests = await axios.get(process.env.REACT_APP_LOGIN_API+'/all/approver/' + activeUser.mail);
        return allRequests.data;
    }

    render() {
        return (
            <Fragment>
                <ApproverHeader />
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/approver"><i className="fa fa-user fa-sm"></i> Approver</Link></BreadcrumbItem>
                            <BreadcrumbItem active>View All Request</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>All Request</h3>
                            <hr />
                        </div>
                    </div>
                    <ViewRequest data={this.fetchData()} role="approver" all={false} />
                </div>
            </Fragment>
        );
    }
}

export default ApproverAllRequest;