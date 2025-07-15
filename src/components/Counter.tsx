import { useState, useEffect, useRef } from "react";

function Counter () {
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const [countOnHour, setCountOnHour] = useState<number | null>(null);
    const [hourCount, setHourCount] = useState<number[]>([]);

    let refCount = useRef(0);

    function addVisitors() {
        setCount(count + 1);
        setTotal(total + 1);
        refCount.current = refCount.current + 1;
    }

    function removeVisitors() {
        setCount(count - 1);
        refCount.current = refCount.current - 1;
    }

    function stopMinus() {
        setCount(count)
    }

    function makeStarted() {
        setStarted(true);
        let now = new Date();
        let target = new Date();
        target.setHours(1, 45, 0, 0);
        const delay = 20000;
        target.getTime() - now.getTime();

        console.log("Started clicked at:", new Date().toLocaleTimeString());
        
        setTimeout(() => {
            setCountOnHour(refCount.current);
        }, delay);
    }

    useEffect(() => {
        console.log("countOnHour changed:", countOnHour);
        if (countOnHour !== null) {
            setHourCount(prev => [...prev, countOnHour]);
        }
    }, [countOnHour]);
    
    return (
        <>
        <h1>Counter</h1>
        <h2>Total Today: {total}</h2>
        <h2>Current guests: {count}</h2>
        <h3></h3>
        {started === false ? <button onClick={makeStarted} disabled={started}>Start</button> : <div><button onClick={count > 0 ?  removeVisitors : stopMinus}>-</button> <button onClick={addVisitors}>+</button></div>}
        {hourCount.map((hourNumberAtStart, index) => <p key={index}>{hourNumberAtStart}</p>)}
        </>
    )
}

export default Counter;