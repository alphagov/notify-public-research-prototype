import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'

function pad (n) { return n < 10 ? '0' + n : n }

function HHMMDateString (d) {
  const HH = pad(d.getHours())
  const MM = pad(d.getMinutes())
  return `${HH}:${MM}`
}

export default class Message extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired
  }

  render () {
    const dateAt = new Date(this.props.time)
    const timeAt = HHMMDateString(dateAt)
    const dateTime = dateAt.toISOString()
    return <div>
      <div className="flex justify-between govuk-gray-1 f5">
        <span>{this.props.author}</span>
        <time dateTime={dateTime}>{timeAt}</time>
      </div>
      <p className="mt0">{this.props.content}</p>
    </div>
  }
}
