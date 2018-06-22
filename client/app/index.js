import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';

import '../assets/css/main.scss';

const formFields = [
    {
        id: "firstName",
        type: "text",
        placeholder: "First Name",
        showColumn: true,
        showField: true
    },
    {
        id: "lastName",
        type: "text",
        placeholder: "Last Name",
        showColumn: true,
        showField: true
    },
    {
        id: "email",
        type: "text",
        placeholder: "Email ID",
        showColumn: true,
        showField: false
    },
    {
        id: "phoneNumber",
        type: "text",
        placeholder: "Phone Number",
        showColumn: true,
        showField: true
    }
]

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Main formFields={formFields} />
    }
}


ReactDOM.render(<App />,document.getElementById('app'));