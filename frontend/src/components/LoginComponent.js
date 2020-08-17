import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <h1>Login Page</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;