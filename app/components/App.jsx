import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import Webchat from './Webchat'

export default class App extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['client', 'client-overlay', 'agent']).isRequired
  }

  render () {
    return <div className="f4 h-100">
      <Webchat type={this.props.type} />
    </div>
  }
}
