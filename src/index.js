import React from "react";
import ReactDOM from "react-dom";

const Counter = () => {
  const [value, setValue] = React.useState(0);

  const increment = () => setValue(value + 1);

  return (
    <>
      <button onClick={increment}>Increment</button>
      <div>Value: {value}</div>
    </>
  );
};

const App = () => (
  <div>
    <Counter />
  </div>
);

const root = document.querySelector("#root");

ReactDOM.render(<App />, root);
