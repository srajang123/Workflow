import React, { Fragment } from 'react';
import { Jumbotron } from 'reactstrap';

import HeaderComponent from './HeaderComponent';

function Home() {
    return (
        <Fragment>
            <HeaderComponent />
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Welcome..</h1>
                            <p>
                                For marketing of a product, Sales Representative to raise a request to seek approval before
                                provding sample product to their customers. System should provide features wherein sales Rep
                                can raise a request and it is approved/rejected by the sample admin. Approver can approve or
                                reject the request based on the details mentioned in request.
                            </p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <div className="container">
                <div className="row">
                    {/* <h1>Home Page</h1> */}
                </div>
            </div>
        </Fragment>
    );
}
export default Home;