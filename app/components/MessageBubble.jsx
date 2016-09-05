import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from '../lib/PropTypes'

export default class MessageBubble extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['blue', 'gray']).isRequired
  }

  render () {
    const cls = classnames('white br2 pa2 w-75 mb2', {
      'bg-purple white': this.props.type === 'blue',
      'bg-govuk-gray-2 govuk-black-1 ml-25': this.props.type === 'gray'
    })
    return <div
      aria-label={`${this.props.author} said: ${this.props.content}`}
      className={cls}
    >
      <div className="flex justify-between f5">
        <span>{this.props.author}</span>
      </div>
      <p className="ma0">{this.props.content}</p>
    </div>
  }
}
