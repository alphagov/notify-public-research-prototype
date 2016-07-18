import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import Message from './Message'

export default class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  render () {
    return <div className="f4">
      {this.props.messages.map((text, idx) => <Message key={idx} content={text} />)}
    </div>
  }
}
