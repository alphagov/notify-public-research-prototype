import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import Message from './MessageBubble'
import UserIsTyping from './UserIsTyping'

class ChattingWithBanner extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }

  render () {
    const {image, name} = this.props
    return <div className="flex pv3">
      <img className="br-100 w3 h3" src={image} alt="Profile picture" />
      <p className="self-center mv0 ml1">You are chatting with {name}.</p>
    </div>
  }
}

export default class MessageList extends Component {
  static propTypes = {
    adviser: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    }).isRequired,
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
    const messageType = (message) => (this.props.isAgent)
      ? ((message.adviser) ? 'gray' : 'blue')
      : ((message.adviser) ? 'blue' : 'gray')
    return <div className="h-100 overflow-y-scroll pb4 wos-a" ref={ref}>
      {(this.props.isAgent) ? null : <ChattingWithBanner
        image={this.props.adviser.image}
        name={this.props.adviser.name}
      />}

      {this.props.messages.map((message, idx) => <Message
        key={idx}
        author={message.author}
        content={message.content}
        time={message.time}
        type={messageType(message)}
      />)}
      {this.props.userIsTyping ? <UserIsTyping user={this.props.userIsTyping} /> : ''}
    </div>
  }
}
