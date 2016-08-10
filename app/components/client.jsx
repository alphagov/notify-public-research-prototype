import 'babel-polyfill'
import fastclick from 'fastclick'
fastclick.attach(document.body)
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AppContainer } from 'react-hot-loader'

const rootEl = document.getElementById('webchat-root')
if (rootEl) {
  const webchatType = rootEl.dataset.webchatType

  ReactDOM.render(
    <AppContainer>
      <App type={webchatType} />
    </AppContainer>,
    rootEl
  )

  if (module.hot) {
    module.hot.accept('./App', () => {
      const NewApp = require('./App').default
      ReactDOM.render(
        <AppContainer><NewApp type={webchatType} /></AppContainer>,
        rootEl
      )
    })
  }
}
