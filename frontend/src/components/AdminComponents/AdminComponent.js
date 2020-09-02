import React, { Fragment } from 'react';
import { Jumbotron, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import AdminHeader from './AdminHeaderComponent';

function Admin() {
    return (
        <Fragment>
            <AdminHeader />
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home"><i className="fa fa-home fa-sm"></i> Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active> Admin</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Admin Dashboard</h3>
                        <hr />
                    </div>
                </div>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Welcome.. Admin</h1>
                                <p>
                                    Admin can manage users through<br />
                                    Add and View (Users)
                                </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <div className="container">
                    <div className="row">
                        {/* <h1>Admin Page</h1> */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Admin;