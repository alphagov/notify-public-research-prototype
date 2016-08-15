import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import Button from './Button'
import Dots from './Dots'

const QUEUE_MAGNITUDE = 100

export default class WebchatQueue extends Component {
  static propTypes = {
    handleQueueDecrement: PropTypes.func.isRequired,
    isAgent: PropTypes.bool.isRequired,
    queueSize: PropTypes.number.isRequired,
    userConnected: PropTypes.bool.isRequired,
    welcomeMessage: PropTypes.string.isRequired
  }

  render () {
    const actualQueueSize = this.props.queueSize
    const queueSize = Math.floor((actualQueueSize - 1) * QUEUE_MAGNITUDE + Math.random() * QUEUE_MAGNITUDE)
    if (this.props.isAgent) {
      if (this.props.userConnected) {
        return <div>
          <p>The user is connected and is in a queue with between {(actualQueueSize - 1) * QUEUE_MAGNITUDE} to {actualQueueSize * QUEUE_MAGNITUDE} people ahead.</p>
          {(this.props.welcomeMessage) ? <p>Once the chat begins, the user will automatically receive this welcome message: "{this.props.welcomeMessage}"</p> : null}
          <p>To move them ahead, use the button below. When the count reaches 0, you'll both be taken to the chat.</p>
          <Button onClick={this.props.handleQueueDecrement}>
            {(actualQueueSize > 1) ? 'Decrement queue by around 1000' : 'Begin chat'}
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
          There are {queueSize} people ahead of you.
        </p>
      </div>
    }
  }
}
