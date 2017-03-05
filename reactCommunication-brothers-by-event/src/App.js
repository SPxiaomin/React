import React, { Component } from 'react';
import AppChildOne from './components/AppChildOne';
import AppChildTwo from './components/AppChildTwo';

class App extends Component {
    render() {
        return (
            <div>
                <AppChildOne />
                <AppChildTwo />
            </div>
        );
    }
}

export default App;
