import React, { Component, PropTypes } from 'react'

export default class Input extends Component {
  static propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func,
    type: PropTypes.oneOf(['text']).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  handleChange (evt) {
    this.props.onChange(evt.target.value)
  }

  render () {
    return <input
      className="ba2 b--govuk-gray-1 pa1 outline w-100"
      id={this.props.id}
      onChange={this::this.handleChange}
      onKeyUp={this.props.onKeyUp}
      type={this.props.type}
      value={this.props.value}
    />
  }
}
