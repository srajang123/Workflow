import React, { Fragment, Component} from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import Home from './HomeComponent';
import Login from './LoginComponent';
import Requester from './RequesterComponent';
import Approver from './ApproverComponent';
import Admin from './AdminComponent';
import Error from './ErrorComponent';

const mapStateToProps = state => {
  return {
    email : state.email,
    password : state.password
  }
}

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
          <Route exact path='/*' component={Error}></Route>
          <Redirect to='/home' />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
