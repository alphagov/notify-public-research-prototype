import React, { Component } from 'react'
import Button from './Button'
import Input from './Input'
import Label from './Label'

export default class App extends Component {
  render () {
    return <div className="f4">
      <p>Please fill in your name to start chatting.</p>

      <Label htmlFor="webchat-input-name">Name</Label>
      <Input id="webchat-input-name" type="text" />

      <Button>Start the chat</Button>
    </div>
  }
}
