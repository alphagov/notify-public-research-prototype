import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from '../lib/PropTypes'
import Button from './Button'
import Input from './Input'
import Label from './Label'

class Adviser extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  }

  render () {
    const cls = classnames('w4 mr3 pointer', { 'outline-govuk-yellow': this.props.isSelected })
    return <div className={cls} onClick={this.props.handleClick}>
      <img
        alt={`${this.props.name}'s profile image`}
        className="w3 h3 br-100 db center"
        src={this.props.image}
      />
      <p className="tc mv1">{this.props.name}</p>
    </div>
  }
}

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

      <div className="w-50 mt3">
        <Button onClick={this.props.handleSubmit}>Start the chat</Button>
      </div>
    </div>
  }
}
