import React, { Component } from 'react'

export default class Dots extends Component {
  state = {
    dots: ''
  }

  updateDots () {
    setTimeout(() => {
      if (!this._stopDots) {
        const dots = (this.state.dots.length >= 3) ? '' : this.state.dots + '.'
        this.setState({ dots })
        this.updateDots()
      }
    }, 300)
  }

  componentDidMount () {
    this.updateDots()
  }

  componentWillUnmount () {
    this._stopDots = true
  }

  render () {
    return <span>{this.state.dots}</span>
  }
}
