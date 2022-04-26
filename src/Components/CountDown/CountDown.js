import React, {useEffect, useState} from 'react';
import './count-down.scss';
import {Button} from "react-bootstrap";
import Alert from "../Alert/Alert";
import SpeedButton from "../SpeedButton/SpeedButton";
import Input from "../Input/Input";
import PauseButton from "../PauseButton/PauseButton";

function CountDown() {
    const [getTimerValue, setGetTimerValue] = useState('');
    const [half, setHalf] = useState(0);
    const [sec, setSec] = useState(0);
    const [pause, setPause] = useState(false);
    const [active, setActive] = useState(1);
    const [timerSpeedSeconds, setTimerSpeedSeconds] = useState(1000);

    const startCountDown = () => {
        if(getTimerValue >= 0 && getTimerValue <= 5000) {
            setSec(getTimerValue * 60);
            setHalf(getTimerValue * 60 / 2);
            setGetTimerValue('');
        } else {
            setGetTimerValue('');
        }
    }

    function numFormat(num) {
        return (num < 10) ? '0' + num.toString() : num.toString();
    }

    function convert(value) {
        const min = Math.floor(value / 60);
        const sec = (value % 60 ? value % 60 : '0');
        return numFormat(min) + ":" + numFormat(sec)
    }

    const handleChangeTimerSpeed = (speedNumber) => {
        if (speedNumber) {
            setTimerSpeedSeconds(1000 / speedNumber);
            setActive(speedNumber);
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
        return () => {
            clearInterval(intervalSeconds);
        };
    }, [sec, pause])

    return (
        <div className="wrapper">
            <div className="timer timer-condition">
                <span className="timer timer-title condition">Countdown:</span>
                <Input
                    placeholderTitle="(Min)"
                    value={getTimerValue}
                    onChangeFunc={onChangeInputValue}
                />
                <Button
                    variant="success"
                    onClick={startCountDown}
                    disabled={!getTimerValue}
                >START</Button>
            </div>
            <Alert sec={sec} half={half} />
            <div className="timer timer-display">
                <div className="timer-display-control-value">{convert(sec)}</div>
                <PauseButton
                    pause={pause}
                    setPause={setPause}
                    disabled={!sec}
                />
            </div>
            <div className="timer timer-speed-control">
                <div className="text-center">Timer Speed</div>
                <SpeedButton
                    active={active}
                    speed={1}
                    changeTimerSpeedFunc={handleChangeTimerSpeed}
                    title="1X"
                />
                <SpeedButton
                    active={active}
                    speed={1.5}
                    changeTimerSpeedFunc={handleChangeTimerSpeed}
                    title="1.5X"
                />
                <SpeedButton
                    active={active}
                    speed={2}
                    changeTimerSpeedFunc={handleChangeTimerSpeed}
                    title="2X"
                />
                <SpeedButton
                    active={active}
                    speed={4}
                    changeTimerSpeedFunc={handleChangeTimerSpeed}
                    title="4X"
                />
            </div>
        </div>
    )
}

export default CountDown;