import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import Message from './Message'
import UserIsTyping from './UserIsTyping'

export default class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.messages.isRequired
  }

  componentWillUpdate () {
    const node = this._node
    this.shouldScrollBottom = (node.scrollTop + node.offsetHeight) === node.scrollHeight
  }

  componentDidUpdate () {
    if (this.shouldScrollBottom) {
      const node = this._node
      node.scrollTop = node.scrollHeight
    }
  }

  render () {
    const ref = (c) => { this._node = c }
    return <div className="h5 overflow-y-scroll" ref={ref}>
      {this.props.messages.map((message, idx) => <Message
        key={idx}
        author={message.author}
        content={message.content}
        time={message.time}
      />)}
      <UserIsTyping user="GOV.UK" />
    </div>
  }
}
