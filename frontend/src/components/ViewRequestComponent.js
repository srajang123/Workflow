import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';

// It will receive data in props for which request to show
class ViewRequest extends Component {
    render() {
        return (
            <Fragment>
                <div className="row row-content">
                    <div className="col-12 col-md-9">
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Request ID</th>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>R/A ID</th>
                                    <th>R/A Notes</th>
                                    <th>R/A Notes</th>
                                    <th>Request Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>1871923</td>
                                    <td>1234121</td>
                                    <td>abc</td>
                                    <td>asdsadasdasd</td>
                                    <td>111111</td>
                                    <td>asdasdasdasd sdasdsadas sa</td>
                                    <td>Active</td>
                                    <td><button>Approved</button></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>1871923</td>
                                    <td>1234121</td>
                                    <td>abc</td>
                                    <td>asdsadasdasd</td>
                                    <td>111111</td>
                                    <td>asdasdasdasd sdasdsadas sa</td>
                                    <td>Active</td>
                                    <td><button>Approved</button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ViewRequest;