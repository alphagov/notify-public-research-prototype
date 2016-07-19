/* global io */
import React, { Component } from 'react'
import WebchatIntro from './WebchatIntro'
import WebchatConversation from './WebchatConversation'

export default class Webchat extends Component {
  state = {
    currentMessage: '',
    messages: [],
    name: '',
    ready: false
  }

  componentDidMount () {
    this.socket = io()
    this.socket.on('chat message', (msg) => {
      this.setState({ messages: [...this.state.messages, msg] })
    })
  }

  handleMessageChange (currentMessage) {
    this.setState({ currentMessage })
  }

  handleMessageSubmit () {
    this.socket.emit('chat message', {
      author: this.state.name,
      content: this.state.currentMessage,
      time: Date.now()
    })
    this.setState({ currentMessage: '' })
  }

  handleNameChange (name) {
    this.setState({ name })
  }

  handleNameSubmit () {
    this.changeToConversation()
  }

  changeToConversation () {
    this.setState({ ready: true })
  }

  changeToIntro () {
    this.setState({ ready: false })
  }

  renderCurrentScreen () {
    if (!this.state.ready) {
      return <WebchatIntro
        handleNameChange={this::this.handleNameChange}
        handleNameSubmit={this::this.handleNameSubmit}
        handleSubmit={this::this.changeToConversation}
        name={this.state.name}
      />
    }
    if (this.state.ready) {
      return <WebchatConversation
        currentMessage={this.state.currentMessage}
        handleBack={this::this.changeToIntro}
        handleMessageChange={this::this.handleMessageChange}
        handleMessageSubmit={this::this.handleMessageSubmit}
        name={this.state.name}
        messages={this.state.messages}
      />
    }
  }

  render () {
    return <div className="f4">
      {this.renderCurrentScreen()}
    </div>
  }
}
