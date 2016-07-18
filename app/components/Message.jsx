import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'

export default class Message extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired
  }

  render () {
    const timeAt = (new Date(this.props.time)).toString()
    return <div>{this.props.author} at {timeAt}: {this.props.content}</div>
  }
}
