import { useState, useEffect, useRef } from "react";

function Counter() {
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [countOnHour, setCountOnHour] = useState<number | null>(null);
  const [hourCount, setHourCount] = useState<
    { hour: number; peopleIn: number }[]
  >([]);
  const [maxCapacity, setMaxCapacity] = useState<number>(0);
  const [warning, setWarning] = useState("");
  const [percentageIn, setPercentageIn] = useState<number>(0);
  const [dangerStyling, setDangerStyling] = useState<React.CSSProperties>({});
  const [spacesLeft, setSpacesLeft] = useState<number>();
  const [shiftLength, setShiftLength] = useState<number>(0);
  const [currentHour, setCurrentHour] = useState<number>(0);
  const [highestInHour, setHighestInHour] = useState<number>(0);
  const [hourCountHights, setHourCountHights] = useState<
    { hour: number; peopleIn: number }[]
  >([]);

  let refCount = useRef(0);

  // Adding on the counter and total
  function addVisitors() {
    setCount(count + 1);
    setTotal(total + 1);
    refCount.current = refCount.current + 1;
  }

  // Subtraction on the counter
  function removeVisitors() {
    setCount(count - 1);
    refCount.current = refCount.current - 1;
  }

  // Stops counter working when you go over or under
  function stopCount() {
    setCount(count);
  }

  // Handles how long the timer function should run
  function handleShiftLength(e: React.ChangeEvent<HTMLInputElement>) {
    setShiftLength(Number(e.target.value));
  }

  // Timer function for getting the hourly stats
  function handleTimer() {
    let now = new Date();
    let target = new Date();
    let hour: number = now.getHours();
    let minute: number = now.getMinutes();
    for (let i = 0; i <= shiftLength; i++) {
      target.setHours(hour, minute + i, 0, 0);
      let delay = target.getTime() - now.getTime();
      setTimeout(() => {
        setCountOnHour(refCount.current);
        setCurrentHour(minute + i);
      }, delay);
      5;
    }
    console.log("Started clicked at:", new Date().toLocaleTimeString());
  }

  // Handles the start of the starting function
  function makeStarted() {
    setStarted(true);
    handleTimer();
  }

  // Effect for getting the count on the hour
  useEffect(() => {
    if (countOnHour !== null && currentHour !== null) {
      setHourCount((prev) => [
        ...prev,
        { hour: currentHour, peopleIn: countOnHour },
      ]);
    }
  }, [countOnHour]);

  // Getting the max capacity and being able to set it
  function handleMaxValue(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxCapacity(Number(e.target.value));
  }

  // Effect for setting spaces left and showing it on screen
  useEffect(() => {
    setSpacesLeft(maxCapacity - count);
  }, [count]);

  // Working out logic for the stats of highest number within the hour
  useEffect(() => {
    if (count > highestInHour) {
      setHighestInHour(count);
    }
  }, [count]);

  useEffect(() => {
    setHourCountHights((prev) => [
      ...prev,
      { hour: currentHour, peopleIn: highestInHour },
    ]);
    setHighestInHour(0);
  }, [countOnHour]);

  // Effect for getting percentages of capacity
  useEffect(() => {
    let percentage = Math.floor((count / maxCapacity) * 100);
    setPercentageIn(percentage);
    if (percentage >= 100) setWarning("Capacity full");
    else if (percentage >= 90) {
      setWarning("You are nearly at capacity");
      setDangerStyling({ color: "red" });
    } else if (percentage >= 80) {
      setWarning("Starting to get full");
      setDangerStyling({ color: "orange" });
    } else {
      setWarning("");
      setDangerStyling({ color: "black" });
    }
  }, [count, percentageIn]);

  return (
    <>
      <h1>Counter</h1>
      <h4>{percentageIn >= 90 && `Spaces left: ${spacesLeft}`}</h4>
      {started === true && (
        <div>
          <h2>Total Today: {total}</h2>
          <h2 style={dangerStyling}>Current guests: {count}</h2>
          <h3 style={dangerStyling}>{warning}</h3>
          <h2>
            Capacity Percentage: {percentageIn > 0 ? `${percentageIn}%` : `0%`}
          </h2>
          <p>{shiftLength}</p>
          <h3>Max Capacity: {maxCapacity}</h3>
        </div>
      )}
      {started === false ? (
        <div>
          <input
            type="number"
            placeholder="How Long is the Event?"
            onChange={handleShiftLength}
          />
          <input type="number" onChange={handleMaxValue} />
          <button onClick={makeStarted} disabled={started}>
            Start
          </button>
        </div>
      ) : (
        <div>
          <button onClick={count > 0 ? removeVisitors : stopCount}>-</button>{" "}
          <button onClick={count < maxCapacity ? addVisitors : stopCount}>
            +
          </button>
        </div>
      )}

      <div>
        {hourCount.map((entry, index) => (
          <p key={index}>
            00:{entry.hour < 10 ? `0${entry.hour}` : entry.hour} -{" "}
            {entry.peopleIn} people
          </p>
        ))}
        {hourCountHights.map((highest, index) => (
          <p key={index}>00:{highest.hour} -{" "}{highest.peopleIn}</p>
        ))}
      </div>
    </>
  );
}

export default Counter;
