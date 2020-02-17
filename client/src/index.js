import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch } from "react-router-dom";

import Routes from './routes'

render(
  <BrowserRouter>
    <Switch>
      <Routes />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
)