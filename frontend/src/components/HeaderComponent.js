import React from 'react';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';

function Header() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">
              Product Sample Approval Workflow
            </NavbarBrand>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Welcome..</h1>
                <p>For marketing of a product, Sales Representative to raise a request to seek approval before 
                  provding sample product to their customers. System should provide features wherein sales Rep 
                  can raise a request and it is approved/ rejected by the sample admin. Approver can approve or 
                  reject the request based on the details mentioned in request.</p>
              </div>
            </div>
          </div>
        </Jumbotron>
      </div>
    );
}
export default Header;