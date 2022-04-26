import React from 'react';

const Input = ({ placeholderTitle ,value, onChangeFunc }) => {

    return (
        <input
            type="text"
            className="timer timer-input condition"
            placeholder={placeholderTitle}
            value={value}
            onChange={(e) => onChangeFunc(e)}
        />
    );
};

export default Input;