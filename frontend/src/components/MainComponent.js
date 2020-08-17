import React, {Fragment} from 'react';
import Header from './HeaderComponent';
//import Home from './HomeComponent';
import Login from './LoginComponent';

function Main() {
  return (
    <div>   
        <Header/>
        <Fragment>
            <Login/>
        </Fragment>
    </div>
  );
}
export default Main;
