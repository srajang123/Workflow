import React, { Fragment, Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Home Component
import Home from './HomeComponent';
import Login from './LoginComponent';
import Requester from './RequesterComponents/RequesterComponent';
import Approver from './ApproverComponents/ApproverComponent';
import Admin from './AdminComponents/AdminComponent';
import Error from './ErrorComponent';

// Admin Component
import AddUser from './AdminComponents/AddUserComponent';
import ViewUser from './AdminComponents/ViewUserComponent';

// // Requester Component
import RequesterRaiseRequest from './RequesterComponents/RaiseRequestComponent';
import RequesterActiveRequest from './RequesterComponents/RequesterActiveComponent';
import RequesterAllRequest from './RequesterComponents/RequesterAllComponent';

// Approver Component
import ApproverActiveRequest from './ApproverComponents/ApproverActiveComponent';
import ApproverAllRequest from './ApproverComponents/ApproverAllComponent';


import { ProtectedRoute } from './ProtectedRoute';
class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginFlag: false,
            activeEmail: "",
            activeRole: ""
        }
    }

    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path='/' component={() => <Home />}></Route>
                    <Route exact path='/home' component={() => <Home />}></Route>
                    <Route exact path='/login' component={() => <Login />} ></Route>

                    {/* Admin Routes */}
                    <ProtectedRoute exact path='/admin' component={() => <Admin />} />
                    <ProtectedRoute exact path='/admin/add' component={() => <AddUser />} />
                    <ProtectedRoute exact path='/admin/view' component={ViewUser} />

                    {/* Approver Routes */}
                    <ProtectedRoute exact path='/approver' component={() => <Approver />} />
                    <ProtectedRoute exact path='/approver/active' component={() => <ApproverActiveRequest />} />
                    <ProtectedRoute exact path='/approver/all' component={() => <ApproverAllRequest />} />

                    {/* Requester Routes */}
                    <ProtectedRoute exact path='/requester' component={() => <Requester />} />
                    <ProtectedRoute exact path='/requester/new' component={() => <RequesterRaiseRequest />} />
                    <ProtectedRoute exact path='/requester/active' component={() => <RequesterActiveRequest />} />
                    <ProtectedRoute exact path='/requester/all' component={() => <RequesterAllRequest />} />

                    <Route exact path='/*' component={Error}></Route>
                    <Redirect to='/home' />
                </Switch>
            </Fragment>
        );
    }
}

export default Main;
