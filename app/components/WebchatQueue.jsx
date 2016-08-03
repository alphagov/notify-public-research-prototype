import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import Button from './Button'
import Dots from './Dots'

export default class WebchatQueue extends Component {
  static propTypes = {
    handleQueueDecrement: PropTypes.func.isRequired,
    isAgent: PropTypes.bool.isRequired,
    queueSize: PropTypes.number.isRequired,
    userConnected: PropTypes.bool.isRequired,
    welcomeMessage: PropTypes.string.isRequired
  }

  render () {
    const {queueSize} = this.props
    if (this.props.isAgent) {
      if (this.props.userConnected) {
        return <div>
          <p>The user is connected and is in a queue with {this.props.queueSize} {(queueSize !== 1) ? 'people' : 'person'} ahead.</p>
          {(this.props.welcomeMessage) ? <p>Once the chat begins, the user will automatically receive this welcome message: "{this.props.welcomeMessage}"</p> : null}
          <p>To move them ahead, use the button below. When the count reaches 0, you'll both be taken to the chat.</p>
          <Button onClick={this.props.handleQueueDecrement}>
            {(queueSize > 1) ? 'Decrement queue' : 'Begin chat'}
          </Button>
        </div>
      } else {
        return <div>
          <p>Waiting for user to connect<Dots /></p>
        </div>
      }
    } else {
      return <div>
        <p className="mt5 tc">
          You are in a queue.<br />
          There are {this.props.queueSize} people ahead of you.
        </p>
      </div>
    }
  }
}
