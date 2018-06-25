import React from 'react';
import PropTypes from 'prop-types';

export default class InputControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            inputValue: {}
        }
    }
    handleChange(event) {
        let inputValue = {...this.state.inputValue}; 
        inputValue[event.target.id] = event.target.value;
        this.setState({inputValue}); //Store each input values in state
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    render() {
        const {
            type, 
            id,
            maxLength,
            value,
            placeholder,
            handleChange
        } = this.props;
        return (
            <input 
                type={type} 
                id={id} 
                maxLength={maxLength} 
                value={value} 
                placeholder={placeholder}
                onChange={this.handleChange}
            />
        );
    }
}

InputControl.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string,
    maxLength: PropTypes.number,
    value: PropTypes.any,
    placeholder: PropTypes.any.isRequired,
    handleChange: PropTypes.func
}

InputControl.defaultProps = {
    type: "text"
}