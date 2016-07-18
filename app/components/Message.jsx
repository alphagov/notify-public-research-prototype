import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'

export default class Message extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired
  }

  render () {
    return <div>{this.props.content}</div>
  }
}
