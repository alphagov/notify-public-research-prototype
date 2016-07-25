/* global io */
import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from '../lib/PropTypes'
import WebchatIntro from './WebchatIntro'
import WebchatConversation from './WebchatConversation'

export default class Webchat extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['client', 'agent']).isRequired
  }

  state = {
    currentMessage: '',
    messages: [],
    myName: '',
    ready: false,
    whoIsTyping: ''
  }

  isClient () {
    return this.props.type === 'client'
  }

  isAgent () {
    return this.props.type === 'agent'
  }

  getMyName () {
    return this.state.myName
  }

  userIsTyping () {
    return this.state.whoIsTyping
  }

  // Executes after a while to clean the typing notification in case people
  // disconnect or stop sending events. _.debounce call is in componentDidMount.
  handleTypingCleanup () {
    this.setState({ whoIsTyping: '' })
  }

  handleWebchatMessage (payload) {
    this.setState({ messages: [...this.state.messages, payload] })
  }

  handleWebchatTyping (payload) {
    const whoIsTyping = payload.name
    const isTyping = payload.isTyping
    const isOtherPerson = whoIsTyping !== this.getMyName()
    if (isOtherPerson) {
      if (isTyping) {
        this.setState({ whoIsTyping })
        this.handleTypingCleanup()
      } else {
        this.setState({ whoIsTyping: '' })
      }
    }
  }

  handleChatMessageReceived ({ type, payload }) {
    switch (type) {
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

    this.handleTypingCleanup = _.debounce(this.handleTypingCleanup, 1000)
  }

  handleMessageChange (currentMessage) {
    const isTyping = currentMessage.length
    this.socket.emit('message', {
      type: 'WEBCHAT_TYPING',
      payload: {
        name: this.getMyName(),
        isTyping
      }
    })
    this.setState({ currentMessage })
  }

  handleMessageSubmit () {
    const author = this.getMyName()
    const content = this.state.currentMessage
    const time = Date.now()
    this.socket.emit('message', {
      type: 'WEBCHAT_MESSAGE',
      payload: { author, content, time }
    })
    this.socket.emit('message', {
      type: 'WEBCHAT_TYPING',
      payload: {
        name: author,
        isTyping: false
      }
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

  renderCurrentScreen () {
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
        handleMessageChange={this::this.handleMessageChange}
        handleMessageSubmit={this::this.handleMessageSubmit}
        messages={this.state.messages}
        userIsTyping={this.userIsTyping()}
      />
    }
  }

  render () {
    return <div className="f4 h-100">
      {this.renderCurrentScreen()}
    </div>
  }
}
