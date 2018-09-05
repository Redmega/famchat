import React, { SyntheticEvent, ChangeEvent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'react-emotion'

import ChatView from './views/chat'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

type AppState = {
    name: string,
    chatEntered: boolean,
}

const AppWrapper = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;

    #name {
        padding: 1rem;
        display: block;
    }

    #join {
        padding: 1rem;
        display: block;
        width: 100%;
        background: rgb(130, 224, 255);
        border: none;
    }
`

class App extends React.Component<{}, AppState> {
    state = {
        name: '',
        chatEntered: false,
    }

    handleJoin = event => {
        event.preventDefault()

        if (this.state.name) {
            this.setState({ chatEntered: true })
        } else {
            alert('Please enter your name')
        }
    }

    setName = (event: ChangeEvent<HTMLInputElement>) => this.setState({ name: event.target.value })

    render() {
        return this.state.chatEntered
            ? <ChatView name={this.state.name} />
            : (
                <AppWrapper>
                    <form onSubmit={this.handleJoin}>
                        <input 
                            autoFocus id='name' 
                            placeholder='Name' 
                            onChange={this.setName}
                            autoComplete='username' 
                        />
                        <button id='join'>Enter Chat</button>
                    </form>
                </AppWrapper>
            )
    }
}

// Initialize font awesome library with selected fonts
library.add(faPaperPlane)

ReactDOM.render(<App />, document.getElementById('root'))