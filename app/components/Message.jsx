import React, { Component, PropTypes } from 'react'

export default class Message extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired
  }

  render () {
    return <div>{this.props.content}</div>
  }
}
