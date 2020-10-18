import React, { Component, Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import ViewRequest from '../ViewRequestComponent';
import RequesterHeader from './RequesterHeaderComponent';

import Cookies from 'js-cookie';
import axios from 'axios';

class RequesterActiveRequest extends Component {

    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }

    async fetchData() {
        let activeUser = await Cookies.getJSON("activeUser");
        const activeRequests = await axios.get(process.env.REACT_APP_LOGIN_API+'/active/requester/' + activeUser.mail);
        return activeRequests.data;
    }

    render() {
        return (
            <Fragment>
                <RequesterHeader />
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/requester"><i className="fa fa-user fa-sm"></i> Requester</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Active Request</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Active Request</h3>
                            <hr />
                        </div>
                    </div>
                    <ViewRequest data={this.fetchData()} role="requester" all={false} />
                </div>
            </Fragment>
        );
    }
}

export default RequesterActiveRequest;