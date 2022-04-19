import React, {useEffect, useState} from 'react';
import './count-down.scss';
import {Button, } from "react-bootstrap";
import { ImPause, ImPlay2 } from "react-icons/im";

function CountDown() {
    const [getTimerValue, setGetTimerValue] = useState('');
    const [half, setHalf] = useState(0);
    const [sec, setSec] = useState(0);
    const [pause, setPause] = useState(false);
    const [active, setActive] = useState(1);
    const [timerSpeedSeconds, setTimerSpeedSeconds] = useState(1000);

    const startCountDown = () => {
        if(getTimerValue >= 0 && getTimerValue <= 5000) {
            setSec(getTimerValue * 60)
            setHalf(getTimerValue * 60 / 2)
            setGetTimerValue('')
        } else {
            setGetTimerValue('')
        }
    }

    function numFormat(num) {
        return (num < 10) ? '0' + num.toString() : num.toString();
    }

    function convert(value) {
        let min = Math.floor(value / 60);
        let sec = (value % 60 ? value % 60 : '0')
        return numFormat(min) + ":" + numFormat(sec)
    }

    const alerts = () => {
        if (sec <= half && sec > 0) {
            return (
                <div className={sec <= 10 ? "timer timer-duration-description blink" : "timer timer-duration-description"}>
                    <p>More that halfway there!</p>
                </div>
            )
        } else if (sec === 0) {
            return (
                <div className="timer timer-duration-description">
                    <p>Times up!</p>
                </div>
            )
        }
    }

    const handleChangeTimerSpeed = (speedNumber) => {
        if (speedNumber === 1) {
            setTimerSpeedSeconds(1000)
            setActive(1)
        } else if (speedNumber === 1.5) {
            setTimerSpeedSeconds(1000 / 1.5)
            setActive(2)
        } else if (speedNumber === 2) {
            setTimerSpeedSeconds(1000 / 2)
            setActive(3)
        }
    }

    const onChangeInputValue = (e) => {
        setGetTimerValue(e.target.value.replace(/[^\d.]/ig, ""));
    }

    useEffect(() => {
        const intervalSeconds = setInterval(() => {
            const newCount = sec - 1;
            setSec(
                newCount >= 0 ? newCount : 0
            );
        }, timerSpeedSeconds);

        if(pause) {
            clearInterval(intervalSeconds);
        }
        return () => clearInterval(intervalSeconds);
    }, [sec, pause])

    return (
        <div className="wrapper">
            <div className="timer timer-condition">
                <span className="timer timer-title condition">Countdown:</span>
                <input
                       type="text"
                       className="timer timer-input condition"
                       placeholder="(Min)"
                       value={getTimerValue}
                       pattern="\d*"
                       onChange={(e) => onChangeInputValue(e)}/>
                <Button
                        variant="success"
                        onClick={startCountDown}>START</Button>
            </div>
            {alerts()}
            <div className="timer timer-display">
                <div className="timer-display-control-value">{convert(sec)}</div>
                <Button
                    variant="stop-btn"
                    onClick={() => setPause(!pause)}
                >{pause ? (<ImPlay2 size={40}/>) : (<ImPause size={40}/>)}</Button>
            </div>
            <div className="timer timer-speed-control">
                <Button
                    variant="outline-dark"
                    className={active === 1 ? "speed-btn active" : "speed-btn"}
                    onClick={() => handleChangeTimerSpeed(1)}
                    value={active}
                >1X</Button>
                <Button
                    variant="outline-dark"
                    className={active === 2 ? "speed-btn active" : "speed-btn"}
                    onClick={() => handleChangeTimerSpeed(1.5)}
                    value={active}
                >1.5X</Button>
                <Button
                    variant="outline-dark"
                    className={active === 3 ? "speed-btn active" : "speed-btn"}
                    onClick={() => handleChangeTimerSpeed(2)}
                    value={active}
                >2X</Button>
            </div>
        </div>
    )
}

export default CountDown;