import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import Message from './MessageBubble'
import UserIsTyping from './UserIsTyping'

const ChattingWithBanner = () => {
  return <div className="flex pv3">
    <img className="br-100" src="http://placehold.it/50x50" alt="Profile picture" />
    <p className="self-center mv0 ml1">You are chatting with Ashan.</p>
  </div>
}

export default class MessageList extends Component {
  static propTypes = {
    isAgent: PropTypes.bool.isRequired,
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
    return <div className="h-100 overflow-y-scroll pb4 wos-t" ref={ref}>
      {(this.props.isAgent) ? null : <ChattingWithBanner />}
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
