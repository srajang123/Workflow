import React from 'react';
import { Jumbotron } from 'reactstrap';

function Error() {
  return (
    <div>
      <Jumbotron>
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>404 Not Found</h1>
              <p>Error Occured! Page could not be found</p>
            </div>
          </div>
        </div>
      </Jumbotron>
    </div>
  );
}
export default Error;