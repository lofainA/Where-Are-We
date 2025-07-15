import {
    createRoom,
    disconnectPlayer,
    getMaxPlayers,
    getRoomName,
    getRoomPlayers,
    joinRoom,
    initializeGame
} from './controllers/roomController.js';

function setupSocket(io) {
    io.on('connection', (socket) => {
        socket.on('create-room', (data) => createRoom(io, socket, data));
        socket.on('join-room', (data) => joinRoom(io, socket, data));
        socket.on('disconnect', () => disconnectPlayer(io, socket));
        socket.on('get-room-players', (roomId) => getRoomPlayers(io,socket, roomId));
        socket.on('get-room-name', (roomId) => getRoomName(io, socket, roomId));
        socket.on('get-max-players', (roomId) => getMaxPlayers(io, socket, roomId));
        socket.on('start-game', (data) => {initializeGame(io, socket, data)})
    });
}

export default setupSocket;