import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import Message from './Message'

export default class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.messages.isRequired
  }

  render () {
    return <div className="f4">
      {this.props.messages.map((message, idx) => <Message
        key={idx}
        author={message.author}
        content={message.content}
        time={message.time}
      />)}
    </div>
  }
}
