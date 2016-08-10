import React, { Component } from 'react'
import PropTypes from '../lib/PropTypes'
import Button from './Button'
import Label from './Label'

export default class WebchatIntroClient extends Component {
  static propTypes = {
    handleWindowClose: PropTypes.func.isRequired
  }

  render () {
    return <div className="mt3">
      <p>Thank you for using the chat.</p>
      <p>Did we answer your question today?</p>
      <div className="cf">
        <label className="block-label" htmlFor="radio-1">
          <input id="radio-1" type="radio" name="radio-group" value="Yes" />
          Yes
        </label>
        <label className="block-label" htmlFor="radio-2">
          <input id="radio-2" type="radio" name="radio-group" value="No" />
          No
        </label>
      </div>
      <div className="w-75 mt3">
        <Label htmlFor="webchat-other-thoughts">Any other thoughts?</Label>
        <textarea id="webchat-other-thoughts" className="ba2 b--govuk-gray-1 outline w-100 input-reset" />
      </div>
      <div className="w-50-ns mt4-ns mt3">
        <Button onClick={this.props.handleWindowClose}>Close the window</Button>
      </div>
    </div>
  }
}
