import React, { Fragment, Component} from 'react';
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
import UpdateUser from './AdminComponents/UpdateUserComponent';
import ViewUser from './AdminComponents/ViewUserComponent';

// // Requester Component
import RequesterRaiseRequest from './RequesterComponents/RaiseRequestComponent';
import RequesterActiveRequest from './RequesterComponents/RequesterActiveComponent';
import RequesterAllRequest from './RequesterComponents/RequesterAllComponent';

// Approver Component
import ApproverActiveRequest from './ApproverComponents/ApproverActiveComponent';
import ApproverAllRequest from './ApproverComponents/ApproverAllComponent';


import {ProtectedRoute} from './ProtectedRoute';
class Main extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loginFlag : false,
      activeEmail : "",
      activeRole : ""
    }
  }

  componentDidMount = () => {
  }

  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path='/' component={() => <Home activeUser={this.state} /> }></Route>
          <Route exact path='/home' component={() => <Home activeUser={this.state} /> }></Route>
          <Route exact path='/login' component={() => <Login activeUser={this.state} /> } ></Route>
          
          {/* Admin Routes */}
          <ProtectedRoute exact path='/admin' component={() => <Admin activeUser={this.state} /> } />
          <ProtectedRoute exact path='/admin/add' component={() => <AddUser activeUser={this.state} /> } />
          <ProtectedRoute exact path='/admin/update' component={() => <UpdateUser activeUser={this.state} /> } />
          <ProtectedRoute exact path='/admin/view' component={ViewUser} />

          {/* Approver Routes */}
          <ProtectedRoute exact path='/approver' component={() => <Approver activeUser={this.state} /> } /> 
          <ProtectedRoute exact path='/approver/active' component={() => <ApproverActiveRequest activeUser={this.state} /> } />
          <ProtectedRoute exact path='/approver/all' component={() => <ApproverAllRequest activeUser={this.state} /> } />

          {/* Requester Routes */}
          <ProtectedRoute exact path='/requester' component={() => <Requester activeUser={this.state} /> } />
          <ProtectedRoute exact path='/requester/new' component={() => <RequesterRaiseRequest activeUser={this.state} /> } />
          <ProtectedRoute exact path='/requester/active' component={() => <RequesterActiveRequest activeUser={this.state} /> } />
          <ProtectedRoute exact path='/requester/all' component={() => <RequesterAllRequest activeUser={this.state} /> } />

          <Route exact path='/*' component={Error}></Route>
          <Redirect to='/home' />
        </Switch>
      </Fragment>
    );
  }
}

export default Main;
