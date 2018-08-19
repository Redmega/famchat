import React from 'react'

import ChatWrapper from './ChatWrapper'

import io from 'socket.io-client';

type Message = {
    id: string,
    body: string,
    from: string
}

type ChatViewProps = {
    name: string,
}

type ChatViewState = {
    message: string,
    messages: Message[],
}

export default class ChatView extends React.Component<ChatViewProps, ChatViewState> {
    state = {
        message: '',
        messages: []
    }

    socket: (typeof io.Socket)

    componentWillMount() {
        this.socket = io(process.env.SOCKET_URI, { query: { name: this.props.name } })
        this.socket.on('message', (message: Message) => {
            this.setState({ messages: this.state.messages.concat(message) })
        })
    }

    componentWillUnmount() {
        this.socket.close()
    }

    handleMessageChange = ({ target: { value } }) => this.setState({ message: value })

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('sending', this.state.message)
        this.socket.send(this.state.message)
        this.setState({ message: '' })
    }
    render() {
        return (
            <ChatWrapper>
                <ul id="messages">
                    {this.state.messages.map((message: Message) =>
                        <li key={message.id}><b>{message.from}: </b> {message.body}</li>
                    )}
                </ul>

                <form onSubmit={this.handleSubmit}>
                    <input autoFocus onChange={this.handleMessageChange} value={this.state.message} autoComplete="off" />
                    <button>Send</button>
                </form>
            </ChatWrapper>
        )
    }
}