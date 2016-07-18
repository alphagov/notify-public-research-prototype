import React, { PropTypes, Component } from 'react'

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  }

  render () {
    return <button
      className="db ph3 pb1 pt2 bg-govuk-green-1 bn white pointer hover-bg-govuk-green-3 shadow-green outline relative active-offset mv3"
    >
      {this.props.children}
    </button>
  }
}
