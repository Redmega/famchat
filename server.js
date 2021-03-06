const express = require('express')
const Bundler = require('parcel-bundler')
const path = require('path')
const uuid = require('uuid/v1');

const app = express()
const server = require('http').Server(app)

const bundler = new Bundler(path.resolve(__dirname, 'src/index.html'))

const DEV = process.env.NODE_ENV === 'development'

// TEMP holding for chat room state
const store = {}

if (DEV) {
    app.use(bundler.middleware())
} else {
    app.use(express.static('public'))
    app.get('/ping', (req, res) => res.send('pong'))
}

const io = require('socket.io')(server)

io.on('connection', socket => {
    const { name } = socket.handshake.query
    console.info(name + ' connected')
    if(!store[socket.id]) {
        store[socket.id] = {
            name
        }
        io.emit('update_room', { members: store })
    }

    socket.broadcast.send({ body: `${name} has joined`, from: 'Server', id: uuid(), meta: true })

    socket.on('message', body => {
        io.send({ body, from: name, id: uuid() })
    })

    socket.on('disconnect', () => {
        console.info(name + ' disconnected')
        delete store[socket.id]
        io.emit('update_room', { members: store })
        socket.broadcast.send({ body: `${name} has left`, from: 'Server', id: uuid(), meta: true })
    });
})

server.listen(process.env.PORT, () => {
    console.log(`The server is running at ${process.env.HOSTNAME}:${process.env.PORT}`)
})