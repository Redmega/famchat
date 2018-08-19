import React from 'react'
import ReactDOM from 'react-dom'

import ChatView from './views/chat'

type AppState = {
    name: string,
    chatEntered: boolean,
}

class App extends React.Component<{},AppState> {
    state = {
        name: '',
        chatEntered: false,
    }

    setName = ({ target: { value } }) => this.setState({ name: value })

    render() {
        return this.state.chatEntered ? <ChatView name={this.state.name} /> : (
            <div>
                <input placeholder='Name' onChange={this.setName} />
                <button onClick={() => this.setState({ chatEntered: true })}>Enter Chat</button>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))