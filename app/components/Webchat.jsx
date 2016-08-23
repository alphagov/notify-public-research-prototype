/* global io */
import React, { Component } from 'react'
import _ from 'lodash'
import UAParser from 'ua-parser-js'
import PropTypes from '../lib/PropTypes'
import WebchatAreYouSure from './WebchatAreYouSure'
import WebchatEnd from './WebchatEnd'
import WebchatIntroAgent from './WebchatIntroAgent'
import WebchatIntroClient from './WebchatIntroClient'
import WebchatQueue from './WebchatQueue'
import WebchatConversation from './WebchatConversation'
import IconClear from './IconClear'
import IconExpandMore from './IconExpandMore'
import {downloadTranscript} from './DownloadTranscript'

// Yes, I am ashamed.
const parser = new UAParser()
const browserName = parser.getBrowser().name
const os = parser.getOS().name
const isAndroidChrome = os === 'Android' && browserName === 'Chrome'
const isMobileSafari = browserName === 'Mobile Safari'
const isInertialScrollingBrowser = isMobileSafari || isAndroidChrome

const advisers = [
  { name: 'Sam', image: '/public/images/advisers/emily.png' },
  { name: 'Jess', image: '/public/images/advisers/flaminia.png' },
  { name: 'Neejal', image: '/public/images/advisers/neejal.png' },
  { name: 'Thomas', image: '/public/images/advisers/tom.png' },
  { name: 'Abby', image: '/public/images/advisers/tricia.png' }
]

export default class Webchat extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['client', 'client-overlay', 'agent']).isRequired
  }

  state = {
    currentMessage: '',
    messages: [],
    myName: '',
    overlayVisible: false,
    overlayMinimized: false,
    queueSize: 10,
    selectedAdviser: 0,
    step: 'intro',
    userConnected: false,
    whoIsTyping: '',
    welcomeMessage: ''
  }

  isClient () {
    return this.props.type === 'client' || this.isClientOverlay()
  }

  isClientOverlay () {
    return this.props.type === 'client-overlay'
  }

  isAgent () {
    return this.props.type === 'agent'
  }

  getMyName () {
    if (this.isAgent()) {
      return advisers[this.state.selectedAdviser].name
    }
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

  handleWebchatAdviser ({ selectedAdviser }) {
    this.setState({ selectedAdviser })
  }

  handleWebchatConnect () {
    if (this.state.welcomeMessage && this.isAgent()) {
      const author = this.getMyName()
      const content = this.state.welcomeMessage
      const time = Date.now()
      if (content) {
        this.socket.emit('message', {
          type: 'WEBCHAT_MESSAGE',
          payload: { author, content, time, adviser: this.isAgent() }
        })
      }
      this.socket.emit('message', {
        type: 'WEBCHAT_ADVISER',
        payload: { selectedAdviser: this.state.selectedAdviser }
      })
    }
    this.setState({ userConnected: true })
  }

  handleWebchatMessage (payload) {
    if (payload.content.length === 0 || payload.author.length === 0) {
      return
    }
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

  handleWebchatQueueDecrement ({ value }) {
    this.setState({ queueSize: value })
    if (value < 1) {
      this.changeToConversation()
    }
  }

  handleWebchatEnd () {
    if (this.isClient()) {
      this.changeToEnd()
    } else {
      downloadTranscript(this.state.messages)
      this.setState({
        messages: [],
        queueSize: 10,
        userConnected: false
      })
      this.changeToQueue()
    }
  }

  handleChatMessageReceived ({ type, payload }) {
    switch (type) {
      case 'WEBCHAT_ADVISER':
        this.handleWebchatAdviser(payload)
        break
      case 'WEBCHAT_CONNECT':
        this.handleWebchatConnect(payload)
        break
      case 'WEBCHAT_MESSAGE':
        this.handleWebchatMessage(payload)
        break
      case 'WEBCHAT_TYPING':
        this.handleWebchatTyping(payload)
        break
      case 'WEBCHAT_QUEUE_DECREMENT':
        this.handleWebchatQueueDecrement(payload)
        break
      case 'WEBCHAT_END':
        this.handleWebchatEnd(payload)
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

    this.handleTypingCleanup = _.debounce(this.handleTypingCleanup, 3000)

    if (this.isClientOverlay()) {
      Array.from(document.querySelectorAll('.js-trigger-custom-overlay'))
        .forEach((el) => el.addEventListener('click', this::this.handleOverlayShow))
    }
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
    if (content) {
      this.socket.emit('message', {
        type: 'WEBCHAT_MESSAGE',
        payload: { author, content, time, adviser: this.isAgent() }
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
  }

  handleAdviserChange (idx) {
    this.handleNameChange(advisers[idx].name)
    this.setState({ selectedAdviser: idx })
  }

  handleNameChange (myName) {
    this.setState({ myName })
  }

  handleOverlayToggle () {
    const overlayMinimized = !this.state.overlayMinimized
    if (isInertialScrollingBrowser) {
      if (overlayMinimized) {
        document.body.classList.remove('prevent-scrolling')
      } else {
        document.body.classList.add('prevent-scrolling')
      }
    }
    this.setState({ overlayMinimized })
  }

  handleOverlayShow (evt) {
    evt.preventDefault()
    if (isInertialScrollingBrowser) {
      document.body.classList.add('prevent-scrolling')
    }
    this.setState({ overlayVisible: true, overlayMinimized: false })
  }

  handleOverlayHide () {
    if (isInertialScrollingBrowser) {
      document.body.classList.remove('prevent-scrolling')
    }
    this.setState({ overlayVisible: false })
  }

  handleWelcomeMessageChange (welcomeMessage) {
    this.setState({ welcomeMessage })
  }

  handleQueueDecrement () {
    this.socket.emit('message', {
      type: 'WEBCHAT_QUEUE_DECREMENT',
      payload: { value: this.state.queueSize - 1 }
    })
  }

  handleEndChat () {
    this.socket.emit('message', {
      type: 'WEBCHAT_END',
      payload: {}
    })
  }

  changeToIntro () {
    this.setState({ step: 'intro' })
  }

  changeToQueue () {
    this.setState({ step: 'queue' })
    if (this.isClient()) {
      this.socket.emit('message', {
        type: 'WEBCHAT_CONNECT',
        payload: { name: this.getMyName() }
      })
    }
  }

  changeToConversation () {
    this.setState({ step: 'conversation' })
  }

  changeToAreYouSure () {
    this.setState({
      previousStep: this.state.step,
      step: 'are-you-sure'
    })
  }

  changeToEnd () {
    this.setState({ step: 'end' })
  }

  changeToPrevious () {
    this.setState({
      previousStep: this.state.step,
      step: this.state.previousStep
    })
  }

  renderCurrentStep () {
    switch (this.state.step) {
      case 'intro':
        if (this.isAgent()) {
          return <WebchatIntroAgent
            advisers={advisers}
            handleAdviserChange={this::this.handleAdviserChange}
            handleWelcomeMessageChange={this::this.handleWelcomeMessageChange}
            handleSubmit={this::this.changeToQueue}
            selectedAdviser={this.state.selectedAdviser}
            welcomeMessage={this.state.welcomeMessage}
          />
        } else {
          return <WebchatIntroClient
            handleNameChange={this::this.handleNameChange}
            handleSubmit={this::this.changeToQueue}
            name={this.getMyName()}
          />
        }
      case 'queue':
        return <WebchatQueue
          advisers={advisers}
          handleAdviserChange={this::this.handleAdviserChange}
          handleQueueDecrement={this::this.handleQueueDecrement}
          handleSubmit={this::this.changeToQueue}
          handleWelcomeMessageChange={this::this.handleWelcomeMessageChange}
          isAgent={this.isAgent()}
          queueSize={this.state.queueSize}
          selectedAdviser={this.state.selectedAdviser}
          userConnected={this.state.userConnected}
          welcomeMessage={this.state.welcomeMessage}
        />
      case 'conversation':
        return <WebchatConversation
          adviser={advisers[this.state.selectedAdviser]}
          currentMessage={this.state.currentMessage}
          handleEndChat={this::this.handleEndChat}
          handleMessageChange={this::this.handleMessageChange}
          handleMessageSubmit={this::this.handleMessageSubmit}
          isAgent={this.isAgent()}
          messages={this.state.messages}
          userIsTyping={this.userIsTyping()}
          name={this.getMyName()}
        />
      case 'are-you-sure':
        return <WebchatAreYouSure
          handleEnd={this::this.handleEndChat}
          handleReturn={this::this.changeToPrevious}
        />
      case 'end':
        return <WebchatEnd
          handleWindowClose={this::this.handleOverlayHide}
          messages={this.state.messages}
        />
    }
  }

  renderOverlay () {
    const {overlayMinimized, overlayVisible} = this.state
    const height = '70vh'
    let transformContainer = ''
    let backdropOpacity = 0.0
    let backdropPointerEvents = ''
    if (overlayVisible) {
      if (overlayMinimized) {
        transformContainer = `translate3d(0, calc(${height} - 3rem + 1px), 0)`
        backdropOpacity = 0.0
        backdropPointerEvents = 'none'
      } else {
        transformContainer = 'translate3d(0, 0, 0)'
        backdropOpacity = 0.5
        backdropPointerEvents = 'auto'
      }
    } else {
      transformContainer = `translate3d(0, ${height}, 0)`
      backdropOpacity = 0.0
      backdropPointerEvents = 'none'
    }

    const noCloseButtonStep = this.state.step === 'end' || this.state.step === 'are-you-sure'
    const closeButton = (noCloseButtonStep || overlayMinimized) ? null : <span
      className="flex pointer"
      onClick={this::this.changeToAreYouSure}
    >
      <span className="mr1">close</span>
      <span className="flex self-center">
        <IconClear />
      </span>
    </span>

    const overlay = (!isInertialScrollingBrowser) ? null : <div
      className="fixed top-0 left-0 bottom-0 right-0 bg-black"
      style={{
        opacity: backdropOpacity,
        pointerEvents: backdropPointerEvents,
        transition: 'opacity 0.2s ease',
        zIndex: 1
      }}
      onClick={(overlayMinimized) ? null : this::this.handleOverlayToggle}
    />

    return <div>
      {overlay}
      <div
        className="ba bb-0 b--govuk-gray-1 bg-white fixed bottom-0 right-0 right-2-ns transition-transform w-100 mw6-ns"
        style={{
          height,
          transform: transformContainer,
          zIndex: 2
        }}
      >
        <div
          className="pa2 bg-govuk-black-1 white flex justify-between"
          onClick={(overlayMinimized) ? this::this.handleOverlayToggle : null}
        >
          <span
            className="flex pointer transition-transform"
            onClick={this::this.handleOverlayToggle}
          >
            <span className="flex self-center">
              <IconExpandMore flipVertical={overlayMinimized} />
            </span>
            <span className="ml1">{(overlayMinimized) ? 'show chat' : 'hide'}</span>
          </span>
          {closeButton}
        </div>
        <div className="ph2 center mw6-ns" style={{
          height: 'calc(100% - 3rem)'
        }}>
          {this.renderCurrentStep()}
        </div>
      </div>
    </div>
  }

  render () {
    if (this.isClientOverlay()) {
      return this.renderOverlay()
    }

    return <div className="f4 h-100">
      {this.renderCurrentStep()}
    </div>
  }
}
