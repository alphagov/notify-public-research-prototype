/* global io */
import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import WebchatIntro from './WebchatIntro'
import WebchatConversation from './WebchatConversation'

const AGENT_NAME = 'GOV.UK'

export default class Webchat extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['client', 'agent']).isRequired
  }

  state = {
    currentMessage: '',
    messages: [],
    name: '',
    ready: false
  }

  isClient () {
    return this.props.type === 'client'
  }

  isAgent () {
    return this.props.type === 'agent'
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
    const author = this.isAgent() ? AGENT_NAME : this.state.name
    const content = this.state.currentMessage
    const time = Date.now()
    this.socket.emit('chat message', { author, content, time })
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

  renderClientInterface () {
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

  renderAgentInterface () {
    return <WebchatConversation
      currentMessage={this.state.currentMessage}
      handleBack={this::this.changeToIntro}
      handleMessageChange={this::this.handleMessageChange}
      handleMessageSubmit={this::this.handleMessageSubmit}
      messages={this.state.messages}
    />
  }

  renderCurrentScreen () {
    if (this.isClient()) {
      return this.renderClientInterface()
    }

    if (this.isAgent()) {
      return this.renderAgentInterface()
    }
  }

  render () {
    return <div className="f4">
      {this.renderCurrentScreen()}
    </div>
  }
}
