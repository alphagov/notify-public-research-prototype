import React, { Component, PropTypes } from 'react'

export default class Input extends Component {
  static propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    type: PropTypes.oneOf(['text']).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  handleChange (evt) {
    this.props.onChange(evt.target.value)
  }

  handleKeyUp (evt) {
    const ENTER_KEY_CODE = 13
    const isEnter = evt.keyCode === ENTER_KEY_CODE
    const message = this.props.value.trim()
    const messageIsValid = message.length > 0
    if (isEnter && messageIsValid && this.props.handleSubmit) {
      this.props.handleSubmit(message)
    }
  }

  render () {
    return <input
      className="ba2 b--govuk-gray-1 pa1 outline w-100"
      id={this.props.id}
      onChange={this::this.handleChange}
      onKeyUp={this::this.handleKeyUp}
      type={this.props.type}
      value={this.props.value}
    />
  }
}
