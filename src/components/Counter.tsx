import { useState } from "react";

function Counter () {
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [hourStart, setHourStart] = useState<number[]>([]);
    const [started, setStarted] = useState(false);

    let now = new Date();
    let target = new Date();
    target.setHours(18, 30, 0, 0);

    const delay = target.getTime() - now.getTime();

    
    function addVisitors() {
        setCount(count + 1);
        setTotal(total + 1);
    }

    function removeVisitors() {
        setCount(count - 1);
    }

    function makeStarted() {
        setStarted(true);
    }

    setTimeout(() => {
        setHourStart([...hourStart, count]);
    }, delay);

    return (
        <>
        <h1>Counter</h1>
        <h2>Total Today: {total}</h2>
        <h2>Current guests: {count}</h2>
        <h3></h3>
        {started === false ? <button onClick={makeStarted}>Start</button> : <div><button onClick={removeVisitors}>-</button> <button onClick={addVisitors}>+</button></div>}
        {hourStart.map((hourNumberAtStart, index) => <p key={index}>{hourNumberAtStart}</p>)}
        </>
    )
}

export default Counter;