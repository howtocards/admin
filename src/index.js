import React from "react"
import ReactDom from "react-dom"
import { Button, ThemeProvider } from "mineral-ui"
import { BrowserRouter } from "react-router-dom"
import * as serviceWorker from "./service-worker"

const root = document.getElementById("root")

const render = () =>
  ReactDom.render(
    <BrowserRouter>
      <ThemeProvider>
        <Button>Hello world</Button>
      </ThemeProvider>
    </BrowserRouter>,
    root,
  )

if (module.hot) {
  module.hot.accept("./app", render)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
render()
