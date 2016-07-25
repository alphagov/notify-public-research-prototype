import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from '../lib/PropTypes'
import Input from './Input'
import MessageList from './MessageList'

export default class WebchatConversation extends Component {
  static propTypes = {
    currentMessage: PropTypes.string.isRequired,
    handleMessageChange: PropTypes.func.isRequired,
    handleMessageSubmit: PropTypes.func.isRequired,
    messages: PropTypes.messages.isRequired,
    userIsTyping: PropTypes.string.isRequired
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.messageInput).focus()
  }

  render () {
    return <div className="h-100">
      <div style={{ height: 'calc(100% - 3rem)' }}>
        <MessageList
          messages={this.props.messages}
          userIsTyping={this.props.userIsTyping}
        />
      </div>

      <Input
        handleChange={this.props.handleMessageChange}
        handleSubmit={this.props.handleMessageSubmit}
        ref="messageInput"
        type="text"
        value={this.props.currentMessage}
      />
    </div>
  }
}
