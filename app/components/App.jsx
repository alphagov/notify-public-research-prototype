import React, { Component } from 'react'
import MessageInput from './MessageInput'
import MessageList from './MessageList'

export default class App extends Component {
  state = {
    messages: []
  }

  handleNewMessage (message) {
    this.setState({
      messages: [...this.state.messages, message]
    })
  }

  render () {
    return <div className="f4">
      <MessageList messages={this.state.messages} />
      <MessageInput handleSubmit={this::this.handleNewMessage} />
    </div>
  }
}
