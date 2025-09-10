import {
    createRoom,
    disconnectPlayer,
    getMaxPlayers,
    getRoomName,
    getRoomPlayers,
    joinRoom,
    getCurrentGame,
} from './controllers/roomController.js';

import {
    initializeGame,
    updateStage,
    getGameStage,
    getLocationImage,
    getGame,
} from './controllers/gameController.js';

function setupSocket(io) {
    io.on('connection', (socket) => {
        // room sockets
        socket.on('create-room', (data) => createRoom(io, socket, data));
        socket.on('join-room', (data) => joinRoom(io, socket, data));
        socket.on('disconnect', () => disconnectPlayer(io, socket));
        socket.on('get-room-players', (roomId) => getRoomPlayers(io,socket, roomId));
        socket.on('get-room-name', (roomId) => getRoomName(io, socket, roomId));
        socket.on('get-max-players', (roomId) => getMaxPlayers(io, socket, roomId));
        
        // game sockets
        socket.on('get-game', (gameId) => getGame(io, socket, gameId));
        socket.on('get-stage-status', (gameId) => getGameStage(io, socket, gameId));
        socket.on('start-game', (roomId) => {initializeGame(io, socket, roomId)})
        socket.on('next-round', (data) => {nextRound(io, socket, data)});
        socket.on('end-game', (data) => {endGame(io, socket, data)});
        socket.on('change-stage', ({ roomId, newStage }) => {updateStage(io, roomId, newStage)});

        socket.on('get-location-image', (location) => getLocationImage(io, socket, location))
    });
}

export default setupSocket;