import React from 'react';
import PropTypes from 'prop-types';

export default class ButtonControl extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            type, 
            id,
            value,
            onClick
        } = this.props;
        return (
            <button 
                type={type} 
                id={id} 
                value={value}
                onClick={onClick}
            >
                {value}
            </button>
        );
    }
}

ButtonControl.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string,
    value: PropTypes.any.isRequired,
    onClick: PropTypes.func
}

ButtonControl.defaultProps = {
    type: "button"
}