import React from "react";
import {Button} from "react-bootstrap";

const SpeedButton = ({active, speed, changeTimerSpeedFunc, title}) => {
    return (
        <Button
            variant="outline-dark"
            className={active === speed ? "speed-btn active" : "speed-btn"}
            onClick={() => changeTimerSpeedFunc(speed)}
            value={active}
        >{title}</Button>
    )
}

export default SpeedButton;
