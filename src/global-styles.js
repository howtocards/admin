/* eslint-disable no-unused-expressions */
import normalize from "emotion-normalize"
import { injectGlobal } from "emotion"

injectGlobal`
  ${normalize}

  body {
    font-family: 'open sans';
  }

  *, *::after, *::before {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }
`
