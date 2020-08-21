import React, { Fragment } from 'react';
import { Jumbotron } from 'reactstrap';
import AdminHeader from './AdminHeaderComponent';

function Admin() {
  return (
    <Fragment>
      <AdminHeader />
      <Fragment>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Welcome.. Admin</h1>
                <p>
                  Admin can manage users through<br />
                  view, edit, delete, activate, deactivate rights on users.
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <div className="container">
          <div className="row">
            <h1>Admin Page</h1>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
}
export default Admin;