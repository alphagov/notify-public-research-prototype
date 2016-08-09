import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from '../lib/PropTypes'
import Button from './Button'
import Input from './Input'
import MessageList from './MessageList'

export default class WebchatConversation extends Component {
  static propTypes = {
    adviser: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    }).isRequired,
    currentMessage: PropTypes.string.isRequired,
    handleMessageChange: PropTypes.func.isRequired,
    handleMessageSubmit: PropTypes.func.isRequired,
    handleTranscriptDownload: PropTypes.func.isRequired,
    isAgent: PropTypes.bool.isRequired,
    messages: PropTypes.messages.isRequired,
    name: PropTypes.string.isRequired,
    userIsTyping: PropTypes.string.isRequired
  }

  componentDidMount () {
    const isDesktop = window.innerWidth > 700
    if (isDesktop) {
      ReactDOM.findDOMNode(this.refs.messageInput).focus()
    }
  }

  render () {
    const height = (this.props.isAgent) ? 'calc(100% - 5rem)' : 'calc(100% - 3rem)'
    const transcriptButton = (this.props.isAgent) ? <div className="mv3 w-50">
      <Button onClick={this.props.handleTranscriptDownload}>Download transcript</Button>
    </div> : null
    return <div className="h-100">
      <div style={{ height }}>
        <MessageList
          adviser={this.props.adviser}
          isAgent={this.props.isAgent}
          messages={this.props.messages}
          name={this.props.name}
          userIsTyping={this.props.userIsTyping}
        />
      </div>

      <div className="flex">
        <div className="w-75 pr1">
          <Input
            handleChange={this.props.handleMessageChange}
            handleSubmit={this.props.handleMessageSubmit}
            ref="messageInput"
            type="text"
            value={this.props.currentMessage}
          />
        </div>
        <div className="w-25">
          <Button onClick={this.props.handleMessageSubmit}>Send</Button>
        </div>
      </div>
      {transcriptButton}
    </div>
  }
}
