import React, { Component, PropTypes } from 'react'

export default class Input extends Component {
  static propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['text']).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  render () {
    return <input
      className="ba2 b--govuk-gray-3 pa1 outline"
      id={this.props.id}
      onChange={this.props.onChange}
      onKeyUp={this.props.onKeyUp}
      type={this.props.type}
      value={this.props.value}
    />
  }
}
