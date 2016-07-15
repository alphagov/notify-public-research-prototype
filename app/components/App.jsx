import React, { Component, PropTypes } from 'react'

class Message extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired
  }

  render () {
    return <div>{this.props.content}</div>
  }
}

class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  render () {
    return <div className="f4">
      {this.props.messages.map((text, idx) => <Message key={idx} content={text} />)}
    </div>
  }
}

class MessageInput extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  state = {
    value: ''
  }

  handleOnChange (evt) {
    this.setState({ value: evt.target.value })
  }

  handleOnKeyUp (evt) {
    const ENTER_KEY_CODE = 13
    const isEnter = evt.keyCode === ENTER_KEY_CODE
    if (isEnter) {
      this.props.handleSubmit(this.state.value)
      this.setState({ value: '' })
    }
  }

  render () {
    return <input
      type="text"
      value={this.state.value}
      onChange={this::this.handleOnChange}
      onKeyUp={this::this.handleOnKeyUp}
    />
  }
}

export default class App extends Component {
  state = {
    messages: []
  }

  handleNewMessage (message) {
    this.setState({
      messages: [...this.state.messages, message]
    })
  }

  render () {
    return <div className="f4">
      <MessageList messages={this.state.messages} />
      <MessageInput handleSubmit={this::this.handleNewMessage} />
    </div>
  }
}
