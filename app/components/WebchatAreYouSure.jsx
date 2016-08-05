import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import Button from './Button'

export default class WebchatIntroClient extends Component {
  static propTypes = {
    handleEnd: PropTypes.func.isRequired,
    handleReturn: PropTypes.func.isRequired
  }

  render () {
    return <div className="mt3">
      <p>Are you sure you want to end the chat?</p>
      <div className="flex ">
        <a href="#" className="self-center mr3" onClick={this.props.handleReturn}>No, take me back</a>
        <div className="w-25">
          <Button onClick={this.props.handleEnd}>Yes</Button>
        </div>
      </div>
    </div>
  }
}
