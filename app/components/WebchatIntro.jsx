import React, { Component, PropTypes } from 'react'
import Button from './Button'
import Input from './Input'
import Label from './Label'

export default class WebchatIntro extends Component {
  static propTypes = {
    handleNameChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  }

  render () {
    return <div>
      <p>Please fill in your name to start chatting.</p>

      <Label htmlFor="webchat-input-name">Name</Label>
      <Input
        id="webchat-input-name"
        onChange={this.props.handleNameChange}
        type="text"
        value={this.props.name}
      />

      <Button
        onClick={this.props.handleSubmit}
      >
        Start the chat
      </Button>
    </div>
  }
}
