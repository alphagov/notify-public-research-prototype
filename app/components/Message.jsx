import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'

// // http://stackoverflow.com/questions/7244246/generate-an-rfc-3339-timestamp-similar-to-google-tasks-api
// function ISODateString (d) {
//   function pad (n) { return n < 10 ? '0' + n : n }
//   return d.getUTCFullYear() + '-' +
//     pad(d.getUTCMonth() + 1) + '-' +
//     pad(d.getUTCDate()) + 'T' +
//     pad(d.getUTCHours()) + ':' +
//     pad(d.getUTCMinutes()) + ':' +
//     pad(d.getUTCSeconds()) + 'Z'
// }

function HHMMDateString (d) {
  const HH = d.getHours()
  const MM = d.getMinutes()
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
      <div className="flex justify-between govuk-gray-3 f5">
        <span>{this.props.author}</span>
        <time dateTime={dateTime}>{timeAt}</time>
      </div>
      <p className="mt0">{this.props.content}</p>
    </div>
  }
}
