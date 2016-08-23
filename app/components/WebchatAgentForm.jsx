import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import Adviser from './Adviser'
import Input from './Input'
import Label from './Label'

export default class WebchatAgentForm extends Component {
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
      <p>Please pick from one of the advisers below:</p>

      <div className="flex mb3">
        {this.props.advisers.map(({name, image}, idx) => {
          const handleAdviserClick = () => this.props.handleAdviserChange(idx)
          return <Adviser
            handleClick={handleAdviserClick}
            image={image}
            isSelected={this.props.selectedAdviser === idx}
            key={idx}
            name={name}
          />
        })}
      </div>

      <p>Fill in a welcome message, if you like:</p>

      <div className="mt3">
        <Label htmlFor="webchat-input-welcome-message">Welcome message</Label>
        <Input
          handleChange={this.props.handleWelcomeMessageChange}
          handleSubmit={this.props.handleSubmit}
          id="webchat-input-welcome-message"
          type="text"
          value={this.props.welcomeMessage}
        />
      </div>
    </div>
  }
}
