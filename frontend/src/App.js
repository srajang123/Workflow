import React, { Component } from 'react';
import { Router } from 'react-router-dom'

import Main from './components/MainComponent';

import history from './components/history';

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div className="App">
                    <Main />
                </div>
            </Router>
        );
    }
}

export default App;