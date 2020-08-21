import React, { Component, Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

import AdminHeader from './AdminHeaderComponent';

class ViewUser extends Component {
    render() {
        return (
            <Fragment>
                <AdminHeader />
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to ="/admin"><i className="fa fa-user fa-sm"></i> Admin</Link></BreadcrumbItem>
                            <BreadcrumbItem active>View Users</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>View User</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row row-content">
                        <div className="col-12 col-md-9">
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>User ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>1871923</td>
                                        <td>Mann</td>
                                        <td>Mehta</td>
                                        <td>mehta.m1@tcs.com</td>
                                        <td>Requester</td>
                                        <td>Active</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>1923192</td>
                                        <td>xyz</td>
                                        <td>pqr</td>
                                        <td>a@b.in</td>
                                        <td>Approver</td>
                                        <td>Active</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ViewUser;