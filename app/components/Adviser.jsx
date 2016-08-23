import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from '../lib/PropTypes'

export default class Adviser extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  }

  render () {
    const cls = classnames('w4 mr3 pointer', { 'outline-govuk-yellow': this.props.isSelected })
    return <div className={cls} onClick={this.props.handleClick}>
      <img
        alt={`${this.props.name}'s profile image`}
        className="w3 h3 br-100 db center"
        src={this.props.image}
      />
      <p className="tc mv1">{this.props.name}</p>
    </div>
  }
}
