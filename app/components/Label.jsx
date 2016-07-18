import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'

export default class Label extends Component {
  static propTypes = {
    htmlFor: PropTypes.string,
    children: PropTypes.node.isRequired
  }

  render () {
    return <label
      className="db pb0125"
      htmlFor={this.props.htmlFor}
    >
      {this.props.children}
    </label>
  }
}
