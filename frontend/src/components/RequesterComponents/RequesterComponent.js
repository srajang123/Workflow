import React, { Component, Fragment } from 'react';
import { Jumbotron } from 'reactstrap';

import RequesterHeader from './RequesterHeaderComponent';

class Requester extends Component {
  render() {
    return (
      <Fragment>
        <RequesterHeader />
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
            <h1>Requester Page</h1>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Requester;