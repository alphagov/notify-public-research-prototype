import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import Message from './MessageBubble'
import UserIsTyping from './UserIsTyping'

export default class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.messages.isRequired,
    name: PropTypes.string.isRequired,
    userIsTyping: PropTypes.string.isRequired
  }

  componentWillUpdate (nextProps) {
    this.shouldScrollBottom = this.props.messages.length !== nextProps.messages.length
  }

  componentDidUpdate () {
    if (this.shouldScrollBottom) {
      const node = this._node
      node.scrollTop = node.scrollHeight
    }
  }

  render () {
    const ref = (c) => { this._node = c }
    return <div className="h-100 overflow-y-scroll pt3 pt4-ns" ref={ref}>
      {this.props.messages.map((message, idx) => <Message
        key={idx}
        author={message.author}
        content={message.content}
        time={message.time}
        type={(message.author === this.props.name) ? 'gray' : 'blue'}
      />)}
      {this.props.userIsTyping ? <UserIsTyping user={this.props.userIsTyping} /> : ''}
    </div>
  }
}
