import React, { Fragment, Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './HomeComponent';
import Login from './LoginComponent';
import Requester from './RequesterComponents/RequesterComponent';
import Approver from './ApproverComponents/ApproverComponent';
import Admin from './AdminComponents/AdminComponent';
import Error from './ErrorComponent';

import AddUser from './AdminComponents/AddUserComponent';
import UpdateUser from './AdminComponents/UpdateUserComponent';
import ViewUser from './AdminComponents/ViewUserComponent';

import ApproverViewAllRequest from './ApproverComponents/ApproverAllComponent';
import ApproverViewActiveRequest from './ApproverComponents/ApproverActiveComponent';

import RequesterRaiseRequest from './RequesterComponents/RaiseRequestComponent';
import RequesterActiveRequest from './RequesterComponents/RequesterActiveComponent';
import RequesterAllRequest from './RequesterComponents/RequesterAllComponent';

// import {ViewUser} from './ViewUserComponent';
// import {}

class Main extends Component {
  
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/home' component={Home}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/requester' component={Requester}></Route>
          <Route exact path='/approver' component={Approver}></Route>
          <Route exact path='/admin' component={Admin}></Route>
          
          {/* Admin Routes */}
          <Route exact path='/admin/add' component={AddUser}></Route>
          <Route exact path='/admin/update' component={UpdateUser}></Route>
          <Route exact path='/admin/view' component={ViewUser}></Route>

          {/* Approver Routes */}
          <Route exact path='/approver/active' component={ApproverViewActiveRequest}></Route>
          <Route exact path='/approver/all' component={ApproverViewAllRequest}></Route>

          {/* Requester Routes */}
          <Route exact path='/requester/new' component={RequesterRaiseRequest}></Route>
          <Route exact path='/requester/active' component={RequesterActiveRequest}></Route>
          <Route exact path='/requester/all' component={RequesterAllRequest}></Route>

          <Route exact path='/*' component={Error}></Route>
          <Redirect to='/home' />
        </Switch>
      </Fragment>
    );
  }
}

export default Main;
