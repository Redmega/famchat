import React from 'react'
import io from 'socket.io-client';

import { ChatWrapper, ChatRoster } from './ChatComponents'
import { Message, Room } from './types'

type ChatViewProps = {
    name: string,
}

type ChatViewState = {
    message: string,
    messages: Message[],
    room: Room
}

export default class ChatView extends React.Component<ChatViewProps, ChatViewState> {
    state = {
        message: '',
        messages: [],
        room: {
            members: {}
        }
    }

    socket: (typeof io.Socket)

    componentWillMount() {
        this.socket = io(process.env.SOCKET_URI, { query: { name: this.props.name } })
        this.socket.on('message', (message: Message) => {
            this.setState({ messages: this.state.messages.concat(message) })
        })
        this.socket.on('update_room', (room: Room) => {
            this.setState({ room })
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
                <ChatRoster>
                    <h3>Users online: </h3>
                    {Object.keys(this.state.room.members).map(id => 
                        <span className='username'>{this.state.room.members[id].name}</span>
                    )}
                </ChatRoster>
                <hr />
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