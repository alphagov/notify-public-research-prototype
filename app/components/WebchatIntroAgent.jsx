import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import Button from './Button'
import WebchatAgentForm from './WebchatAgentForm'

export default class WebchatIntroAgent extends Component {
  static propTypes = {
    advisers: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })).isRequired,
    handleAdviserChange: PropTypes.func.isRequired,
    handleWelcomeMessageChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    selectedAdviser: PropTypes.number.isRequired,
    welcomeMessage: PropTypes.string.isRequired
  }

  render () {
    return <div>
      <WebchatAgentForm
        advisers={this.props.advisers}
        handleAdviserChange={this.props.handleAdviserChange}
        handleWelcomeMessageChange={this.props.handleWelcomeMessageChange}
        handleSubmit={this.props.handleSubmit}
        selectedAdviser={this.props.selectedAdviser}
        welcomeMessage={this.props.welcomeMessage}
      />

      <div className="w-50 mt3">
        <Button onClick={this.props.handleSubmit}>Start the chat</Button>
      </div>
    </div>
  }
}
