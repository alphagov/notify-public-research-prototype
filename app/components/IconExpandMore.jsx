import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'

export default class IconExpandMore extends Component {
  static propTypes = {
    flipVertical: PropTypes.bool
  }

  render () {
    const transformToggle = (this.props.flipVertical)
      ? 'rotate(180deg)'
      : 'rotate(0deg)'

    return <svg
      className="transition-transform"
      fill="#FFFFFF"
      height="24"
      style={{
        transform: transformToggle
      }}
      width="24"
      viewBox="0 0 24 24"
    >
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  }
}
