import React from 'react'
import FlipMove from 'react-flip-move';
import io from 'socket.io-client';

import { ChatWrapper, ChatRoster } from './ChatComponents'
import { Message, Room } from './types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    messageBox: HTMLUListElement

    componentWillMount() {
        this.socket = io(process.env.SOCKET_URI, { query: { name: this.props.name } })
        this.socket.on('message', (message: Message) => {
            this.setState({ messages: this.state.messages.concat(message) })
            this.messageBox.scrollTop = this.messageBox.scrollHeight
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
        const { message = '' } = this.state
        event.preventDefault()
        if(message.trim()) {
            this.socket.send(message)
            this.setState({ message: '' })
        }
    }
    
    render() {
        const { room, message, messages } = this.state
        return (
            <ChatWrapper>
                <ChatRoster>
                    <h3>Users online: </h3>
                    {Object.keys(room.members).map(id => 
                        <span className='username'>{room.members[id].name}</span>
                    )}
                    <hr />
                </ChatRoster>

                <ul id="messages" ref={element => this.messageBox = element}>
                    <FlipMove enterAnimation='accordionVertical'>
                        {messages.map((m: Message) =>
                            <li key={m.id} data-meta={m.meta}>
                                {!m.meta && <b>{m.from}: </b>} {m.body}
                            </li>
                        )}
                    </FlipMove>
                </ul>

                <form onSubmit={this.handleSubmit}>
                    <input autoFocus onChange={this.handleMessageChange} value={message} autoComplete="off" />
                    <button><FontAwesomeIcon icon='paper-plane' /></button>
                </form>
            </ChatWrapper>
        )
    }
}