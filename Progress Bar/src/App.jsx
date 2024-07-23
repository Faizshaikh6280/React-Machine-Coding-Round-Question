import { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeOutId = setInterval(function () {
      setValue((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          setValue(100);
          clearInterval(timeOutId);
        }
      });
    }, 100);
  }, []);

  return (
    <div className="progress_bar">
      <div className="progress">
        <div className="progress__innner" style={{ width: `${value}%` }}></div>
        <span className="percentage">{value}%</span>
      </div>
      <div className="status">{value < 100 ? "Loading..." : "Completed!"}</div>
    </div>
  );
}

export default App;
