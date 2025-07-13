import { createRoom, joinRoom, disconnectPlayer } from './controllers/roomController.js';

function setupSocket(io) {
    io.on('connection', (socket) => {
        socket.on('create-room', (data) => createRoom(io, socket, data));
        socket.on('join-room', (data) => joinRoom(io, socket, data));
        socket.on('disconnect', () => disconnectPlayer(io, socket));
    });
}

export default setupSocket;