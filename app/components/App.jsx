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

class Label extends Component {
  static propTypes = {
    htmlFor: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

  render () {
    return <label
      className="db pb0125"
      htmlFor={this.props.htmlFor}
    >
      {this.props.children}
    </label>
  }
}

class Input extends Component {
  static propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['text']).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  render () {
    return <input
      className="ba2 b--govuk-gray-3 pa1 outline"
      id={this.props.id}
      onChange={this.props.onChange}
      onKeyUp={this.props.onKeyUp}
      type={this.props.type}
      value={this.props.value}
    />
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
    return <Input
      id="input-1"
      onChange={this::this.handleOnChange}
      onKeyUp={this::this.handleOnKeyUp}
      type="text"
      value={this.state.value}
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
