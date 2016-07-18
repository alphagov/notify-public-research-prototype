import React, { Component, PropTypes } from 'react'
import Input from './Input'

export default class MessageInput extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  state = {
    value: ''
  }

  handleOnChange (evt) {
    this.setState({ value: evt.target.value })
  }

  handleOnKeyUp (evt) {
    const ENTER_KEY_CODE = 13
    const isEnter = evt.keyCode === ENTER_KEY_CODE
    if (isEnter) {
      this.props.handleSubmit(this.state.value)
      this.setState({ value: '' })
    }
  }

  render () {
    return <Input
      id="input-1"
      onChange={this::this.handleOnChange}
      onKeyUp={this::this.handleOnKeyUp}
      type="text"
      value={this.state.value}
    />
  }
}
