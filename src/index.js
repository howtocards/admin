import React from "react"
import ReactDom from "react-dom"
import { ThemeProvider } from "mineral-ui"
import { Router } from "react-router-dom"
import { createBrowserHistory } from "history"

import * as serviceWorker from "./service-worker"
import { App } from "./app"

const root = document.getElementById("root")
const history = createBrowserHistory()

const render = () =>
  ReactDom.render(
    <Router history={history}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>,
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
