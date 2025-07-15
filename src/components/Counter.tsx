import { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";

function Counter () {
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const [countOnHour, setCountOnHour] = useState<number | null>(null);
    const [hourCount, setHourCount] = useState<number[]>([]);
    const [maxCapacity, setMaxCapacity] = useState<number>();

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
        target.setHours(14, 19, 0, 0);
        const delay = target.getTime() - now.getTime();

        console.log("Started clicked at:", new Date().toLocaleTimeString());
        
        setTimeout(() => {
            setCountOnHour(refCount.current);
        }, delay);5
    }

    useEffect(() => {
        console.log("countOnHour changed:", countOnHour);
        if (countOnHour !== null) {
            setHourCount(prev => [...prev, countOnHour]);
        }
    }, [countOnHour]);

    function handleMaxValue(e: React.ChangeEvent<HTMLInputElement>) {
        setMaxCapacity(Number(e.target.value))
    }
    
    return (
        <>
        <h1>Counter</h1>
        <h2>Total Today: {total}</h2>
        <h2>Current guests: {count}</h2>
        {started === true && <h3>Max Capacity: {maxCapacity}</h3>}
        {started === false ? <div><input type="number" onChange={handleMaxValue} /><button onClick={makeStarted} disabled={started}>Start</button></div>  : <div><button onClick={count > 0 ?  removeVisitors : stopMinus}>-</button> <button onClick={addVisitors}>+</button></div>}
        {hourCount.map((hourNumberAtStart, index) => <p key={index}>{hourNumberAtStart}</p>)}
        </>
    )
}

export default Counter;