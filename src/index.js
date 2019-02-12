import React from "react";
import ReactDom from "react-dom";
import { Button, ThemeProvider } from "mineral-ui";
import * as serviceWorker from "./serviceWorker";

const App = () => (
  <ThemeProvider>
    <Button>Hello world</Button>
  </ThemeProvider>
);

ReactDom.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
