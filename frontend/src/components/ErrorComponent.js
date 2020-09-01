import React, { Fragment } from 'react';
import { Jumbotron } from 'reactstrap';

import HeaderComponent from './HeaderComponent';

function Error() {
    return (
        <Fragment>
            <HeaderComponent />
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
        </Fragment>
    );
}
export default Error;