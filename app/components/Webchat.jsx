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
    myName: '',
    otherPersonName: 'GOV.UK',
    otherPersonIsTyping: true,
    ready: false
  }

  isClient () {
    return this.props.type === 'client'
  }

  isAgent () {
    return this.props.type === 'agent'
  }

  userIsTyping () {
    if (this.state.otherPersonIsTyping) {
      return this.state.otherPersonName
    } else {
      return ''
    }
  }

  handleWebchatConnect (payload) {
    console.log('connect', payload)
  }

  handleWebchatMessage (payload) {
    this.setState({ messages: [...this.state.messages, payload] })
  }

  handleWebchatTyping (payload) {
    console.log('typing', payload)
  }

  handleChatMessageReceived ({ type, payload }) {
    switch (type) {
      case 'WEBCHAT_CONNECT':
        this.handleWebchatConnect(payload)
        break
      case 'WEBCHAT_MESSAGE':
        this.handleWebchatMessage(payload)
        break
      case 'WEBCHAT_TYPING':
        this.handleWebchatTyping(payload)
        break
      default:
        console.warn('Unknown webchat message received!')
        console.warn('Type:', type)
        console.warn('Payload:', payload)
    }
  }

  componentDidMount () {
    this.socket = io()
    this.socket.on('message', this::this.handleChatMessageReceived)
  }

  handleMessageChange (currentMessage) {
    this.setState({ currentMessage })
  }

  handleMessageSubmit () {
    const author = this.isAgent() ? AGENT_NAME : this.state.myName
    const content = this.state.currentMessage
    const time = Date.now()
    this.socket.emit('message', {
      type: 'WEBCHAT_MESSAGE',
      payload: { author, content, time }
    })
    this.setState({ currentMessage: '' })
  }

  handleNameChange (myName) {
    this.setState({ myName })
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
        name={this.state.myName}
      />
    }
    if (this.state.ready) {
      return <WebchatConversation
        currentMessage={this.state.currentMessage}
        handleBack={this::this.changeToIntro}
        handleMessageChange={this::this.handleMessageChange}
        handleMessageSubmit={this::this.handleMessageSubmit}
        messages={this.state.messages}
        userIsTyping={this.userIsTyping()}
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
      userIsTyping={this.userIsTyping()}
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
