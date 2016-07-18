import React, { Component } from 'react'
import WebchatIntro from './WebchatIntro'
import WebchatConversation from './WebchatConversation'

export default class Webchat extends Component {
  state = {
    name: '',
    ready: false
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
        handleBack={this::this.changeToIntro}
        name={this.state.name}
      />
    }
  }

  render () {
    return <div className="f4">
      {this.renderCurrentScreen()}
    </div>
  }
}
