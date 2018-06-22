import React from 'react';
import PropTypes from 'prop-types';
import InputControl from './inputControl';
import ButtonControl from './buttonControl';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this); 
        this.onEdit = this.onEdit.bind(this);
        this.state = {
            inputValue: {},
            columns: []
        }
    }
    handleChange(event) {
        let inputValue = {...this.state.inputValue}; 
        inputValue[event.target.id] = event.target.value;
        this.setState({inputValue});
    }
    onEdit(event) {
        let elem = document.querySelector("#" + event.target.id); 
        let rowValue = elem.dataset.rowValue.split(",");
        let inputValue = {};
        inputValue.firstName = rowValue[0];
        inputValue.lastName = rowValue[1];
        inputValue.email = rowValue[2];
        this.setState({inputValue});
    }
    onClick() {
        let columns = this.state.columns; 
        columns.push(
            <tr id={"row_" + columns.length} key={"row_" + columns.length}>
                <td>{columns.length + 1 + "."}</td>
                <td>{this.state.inputValue.firstName != undefined ? this.state.inputValue.firstName : "--"}</td>
                <td>{this.state.inputValue.lastName != undefined ? this.state.inputValue.lastName : "--"}</td>
                <td>{this.state.inputValue.email != undefined ? this.state.inputValue.email : "--"}</td>
                <td>
                    <a 
                        href="#" 
                        onClick={this.onEdit}
                        id={"row_edit_" + columns.length} 
                        data-row-value={[this.state.inputValue.firstName, this.state.inputValue.lastName, this.state.inputValue.email]}
                    >
                        {"Edit"}
                    </a>
                </td>
            </tr>
        );
        this.setState({columns: columns, inputValue: {}})
    }
    render() {
        console.log(this.state.columns.length);
        return (
            <div>
                <ul>
                    <li>
                        <InputControl 
                            type="text"
                            id="firstName"
                            placeholder={"First Name"}
                            handleChange={this.handleChange}
                            value={this.state.inputValue.firstName != undefined ? this.state.inputValue.firstName : ""}
                        />
                    </li>
                    <li>
                        <InputControl 
                            type="text"
                            id="lastName"
                            placeholder={"Last Name"}
                            handleChange={this.handleChange}
                            value={this.state.inputValue.lastName != undefined ? this.state.inputValue.lastName : ""}
                        />
                    </li>
                    <li>
                        <InputControl 
                            type="text"
                            id="email"
                            placeholder={"Email Id"}
                            handleChange={this.handleChange}
                            value={this.state.inputValue.email != undefined ? this.state.inputValue.email : ""}
                        />
                    </li>
                    <li>
                        <ButtonControl value={"Add"} onClick={this.onClick} />
                    </li>
                </ul>
                {this.state.columns.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th id="tbl_sno">{"S.No."}</th>
                                <th id="tbl_firstName">{"First Name"}</th>
                                <th id="tbl_lastName">{"Last Name"}</th>
                                <th id="tbl_email">{"Email ID"}</th>
                                <th id="tbl_edit">{"Edit"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.columns}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}


