import React, { Component, PropTypes } from 'react'
import Button from './Button'

export default class WebchatConversation extends Component {
  static propTypes = {
    handleBack: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  }

  render () {
    return <div>
      Hello, {this.props.name}

      <Button onClick={this.props.handleBack}>Back to first screen (debug)</Button>
    </div>
  }
}
