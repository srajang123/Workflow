import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './HeaderComponent';
import Home from './HomeComponent';
import Login from './LoginComponent';
import Footer from './FooterComponent';
import Requester from './RequesterComponent';
import Approver from './ApproverComponent';
import Admin from './AdminComponent';
import Error from './ErrorComponent';

function Main() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/home' component={Home}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/requester' component={Requester}></Route>
        <Route exact path='/approver' component={Approver}></Route>
        <Route exact path='/admin' component={Admin}></Route>
        <Route exact path='/*' component={Error}></Route>
      </Switch>
      <Footer />
    </Fragment>
  );
}

export default Main;
