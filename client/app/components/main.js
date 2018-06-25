import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import InputControl from './inputControl';
import ButtonControl from './buttonControl';
import {getValue} from '../actions/inputActions';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this); 
        this.onEdit = this.onEdit.bind(this);
        this.state = {
            inputValue: {},
            columns: [],
            editedRow: null
        }
    }
    handleChange(event) { //On change event for Input controls
        // let inputValue = {...this.state.inputValue}; 
        // inputValue[event.target.id] = event.target.value;
        // this.setState({inputValue}); //Store each input values in state
        this.props.getValue(event.target.value);
    }
    onEdit(event) { //Event for editing row data
        let elem = document.querySelector("#" + event.target.id); 
        let rowValue = elem.dataset.rowValue.split(","); //Change selected row values into array
        let editedRow = parseInt(elem.dataset.rowId); //Get selected row ID
        const {formFields} = this.props;
        /* Restore state input value from selected Row data */
        let inputValue = {};
        let restoreValue = rowValue.map((k,i) => {
            inputValue[formFields[i].id] = rowValue[i];
        });
        
        this.setState({inputValue, editedRow: editedRow});
    }
    onClick() { //On click event for Button control
        const {
            editedRow,
            inputValue
        } = this.state; //Destructuring of state
        const {formFields} = this.props; //Destructuring of props
        /* Render Column based input provided starts */
        let columns = this.state.columns; 
        let storeColumnData = [];
        const bindRows = (index) => { //Common method for binding rows dynamically
            let list = formFields.map((k,i) => {
                let bindColumns = [];                
                if(formFields[i].showColumn) {
                    let field = formFields[i].placeholder;
                    bindColumns.push(
                        <td key={i}>{inputValue[formFields[i].id] != undefined ? inputValue[formFields[i].id] : "--"}</td>
                    )
                }
                storeColumnData.push(inputValue[formFields[i].id]);
                return bindColumns;
            });
            return (
                <tr id={"row_" + index} key={"row_" + index}>
                    <td>{index + 1 + "."}</td>
                    {list}
                    <td>
                        <a 
                            href="#" 
                            onClick={this.onEdit}
                            id={"row_edit_" + index} 
                            data-row-value={storeColumnData}
                            data-row-id={index}
                        >
                            {"Edit"}
                        </a>
                    </td>
                </tr>
            )
        }
        if(editedRow != null) {
            columns[editedRow] = bindRows(editedRow); //Rerender edited rows
        }
        else {
            columns.push(bindRows(columns.length)); //Render rows
        }
        /* Render Column based input provided ends */
        this.setState({columns: columns, inputValue: {}, editedRow: null})
    }
    render() {
        const {
            editedRow,
            inputValue,
            columns
        } = this.state;
        const {formFields} = this.props;
        let tblHeader;
        let renderForms = formFields.map((k, i) => { //Render form fields dynamically
            let list = [];
            if(formFields[i].showField) {
                list.push(
                    <li key={i}>
                        <InputControl
                            {...formFields[i]}
                            handleChange={this.handleChange}
                            value={this.props.valueInput[formFields[i].id]}
                        />
                    </li>
                )
            }
            return list;
        });
        if(columns.length > 0) { //Render Table header dynamically
            tblHeader = formFields.map((k,i) => {
                let list = [];
                if(formFields[i].showColumn){
                    list.push(<th key={i} id={"tbl_" + formFields[i].id}>{formFields[i].placeholder}</th>)
                }
                return list;
            })
        }
        return (
            <div>
                <ul>
                    {renderForms}
                    <li>
                        <ButtonControl value={editedRow != null ? "Update" : "Add"} onClick={this.onClick} />
                    </li>
                </ul>
                {columns.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th id="tbl_sno">{"S.No."}</th>
                                {tblHeader}
                                <th id="tbl_edit">{"Edit"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {columns}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}


const mapStateToProps = (state, props) => {
    let valueInput = {};
    valueInput = state.valueInput;
    return {
        valueInput
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getValue: (val) => {
            dispatch(getValue(val));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);