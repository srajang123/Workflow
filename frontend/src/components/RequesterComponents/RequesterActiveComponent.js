import React, { Component, Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import ViewRequest from '../ViewRequestComponent';
import RequesterHeader from './RequesterHeaderComponent';

import Cookies from 'js-cookie';

class RequesterActiveRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeRequest : undefined,
            activeUser : ""
        }
    }

    componentDidMount() {
        let activeUser = Cookies.getJSON("activeUser");
        // Fetch active request for activeUser user
        
    }

    render() {
        return (
            <Fragment>
                <RequesterHeader />
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to ="/requester"><i className="fa fa-user fa-sm"></i> Requester</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Active Request</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Active Request</h3>
                            <hr />
                        </div>
                    </div>
                    <ViewRequest />
                </div>
            </Fragment>
        );
    }
}

export default RequesterActiveRequest;