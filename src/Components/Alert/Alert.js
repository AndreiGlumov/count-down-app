const Alert = ({sec, half}) =>  {
    if (sec <= half && sec > 0) {
        return (
            <div className={sec <= 10 ? "timer timer-duration-description blink" : "timer timer-duration-description"}>
                <p className="m-0 p-0">More that halfway there!</p>
            </div>
        )
    } else if (sec === 0 && half !== 0) {
        return (
            <div className="timer timer-duration-description">
                <p className="m-0 p-0">Times up!</p>
            </div>
        )
    }
}

export default Alert;