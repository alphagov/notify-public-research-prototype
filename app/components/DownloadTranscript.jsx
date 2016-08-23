import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'

function pad (n) { return n < 10 ? '0' + n : n }

function HHMMDateString (d) {
  const HH = pad(d.getHours())
  const MM = pad(d.getMinutes())
  return `${HH}:${MM}`
}

export default class DownloadTranscript extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    messages: PropTypes.messages.isRequired
  }

  render () {
    const text = this.props.messages
      .map((msg) => `${HHMMDateString(new Date(msg.time))} ${msg.author}: ${msg.content}`)
      .join('\n')

    return <a
      download="webchat-transcript.txt"
      href={'data:text/plain;charset=utf-8,' + encodeURIComponent(text)}
      target="_blank"
      style={{
        textDecoration: 'none'
      }}
    >
      {this.props.children}
    </a>
  }
}

export function downloadTranscript (messages) {
  const text = messages
    .map((msg) => `${HHMMDateString(new Date(msg.time))} ${msg.author}: ${msg.content}`)
    .join('\n')
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', 'webchat-transcript.txt')
  element.setAttribute('target', '_blank')

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
