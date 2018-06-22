import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';

import '../assets/css/main.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Main />
    }
}


ReactDOM.render(<App />,document.getElementById('app'));