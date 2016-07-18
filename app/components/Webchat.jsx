import React, { Component } from 'react'
import WebchatIntro from './WebchatIntro'
import WebchatConversation from './WebchatConversation'

export default class Webchat extends Component {
  state = {
    currentMessage: '',
    messages: ['Hi, you\'re chatting with Ashan. How can I help you today?'],
    name: '',
    ready: false
  }

  handleMessageChange (currentMessage) {
    this.setState({ currentMessage })
  }

  handleMessageSubmit (evt) {
    const ENTER_KEY_CODE = 13
    const isEnter = evt.keyCode === ENTER_KEY_CODE
    if (isEnter) {
      this.setState({
        currentMessage: '',
        messages: [...this.state.messages, this.state.currentMessage]
      })
    }
  }

  handleNameChange (name) {
    this.setState({ name })
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
