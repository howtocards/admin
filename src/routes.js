import React from "react"
import { Link } from "react-router-dom"
import { renderRoutes } from "react-router-config"

const Page1 = () => (
  <div>
    Foo <Link to="/bar">To Bar</Link>
  </div>
)
const Page2 = () => <div>Bar</div>
const PageNotFound = () => <div>404! Error</div>

const routes = [
  { path: "/", exact: true, component: Page1 },
  { path: "/bar", exact: true, component: Page2 },
  { component: PageNotFound },
]

export const Routes = () => renderRoutes(routes)
