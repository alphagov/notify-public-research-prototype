import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from '../lib/PropTypes'
import Button from './Button'
import Input from './Input'
import MessageList from './MessageList'

export default class WebchatConversation extends Component {
  static propTypes = {
    currentMessage: PropTypes.string.isRequired,
    handleBack: PropTypes.func.isRequired,
    handleMessageChange: PropTypes.func.isRequired,
    handleMessageSubmit: PropTypes.func.isRequired,
    messages: PropTypes.messages.isRequired,
    userIsTyping: PropTypes.string.isRequired
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.messageInput).focus()
  }

  render () {
    return <div>
      <MessageList
        messages={this.props.messages}
        userIsTyping={this.props.userIsTyping}
      />

      <Input
        handleChange={this.props.handleMessageChange}
        handleSubmit={this.props.handleMessageSubmit}
        ref="messageInput"
        type="text"
        value={this.props.currentMessage}
      />

      <Button onClick={this.props.handleBack}>Back to first screen (debug, remove later)</Button>
    </div>
  }
}
