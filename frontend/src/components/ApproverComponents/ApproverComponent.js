import React, { Component, Fragment } from 'react';
import { Jumbotron } from 'reactstrap';

import ApproverHeader from './ApproverHeaderComponent';

class Approver extends Component {
  render() {
    return (
      <Fragment>
        <ApproverHeader />
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
            <h1>Approver Page</h1>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Approver;