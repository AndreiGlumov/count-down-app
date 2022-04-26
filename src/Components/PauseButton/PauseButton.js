import React from 'react';
import {ImPause, ImPlay2} from "react-icons/im";
import {Button} from "react-bootstrap";

const PauseButton = ({pause, setPause, disabled}) => {
    return (
        <Button
            variant="stop-btn"
            onClick={() => setPause(!pause)}
            disabled={disabled}
        >{pause ? (<ImPlay2 size={40}/>) : (<ImPause size={40}/>)}</Button>
    );
};

export default PauseButton;