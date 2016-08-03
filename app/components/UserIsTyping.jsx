import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import Dots from './Dots'

export default class UserIsTyping extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired
  }

  render () {
    return <div className="govuk-gray-1 f5" style={{ height: 0 }}>
      {this.props.user} is typing<Dots />
    </div>
  }
}
