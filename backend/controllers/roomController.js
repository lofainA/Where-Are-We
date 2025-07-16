import gameStore from '../utils/gameStore.js';
import roomStore from '../utils/roomStore.js';

export const createRoom = (io, socket, {roomName, maxPlayers, liarCount, playerName}) => {
    const roomId = roomStore.createNewRoom(roomName, maxPlayers, liarCount);
    roomStore.addPlayerToRoom(roomId, socket.id, playerName, 'host');
    socket.join(roomId);
    socket.emit('room-created', roomId); 
    console.log(`Room created: ${roomId} by ${playerName}`);
};

export const joinRoom = (io, socket, { roomId, playerName }) => {
    console.log(`${playerName} is trying to join room: ${roomId}`);
    const success = roomStore.addPlayerToRoom(roomId, socket.id, playerName, 'player');

    if (success == "room is full") {
        console.log(`Room ${roomId} is full. ${playerName} could not join.`);
        return socket.emit('room-full');
    } 
    
    else if (success == "room not found") {
        console.log(`Room ${roomId} not found. ${playerName} could not join.`);
        return socket.emit('room-not-found');
    } 
    
    else if (success === "success") {
        socket.join(roomId);
        const players = roomStore.getPlayers(roomId);
        socket.emit('joined-successfully', roomId);
        console.log(`${playerName} joined room: ${roomId}`);

        io.to(roomId).emit('updated-players', players);
    } 

    else if (success === "game already started") {
        console.error(`Game already started in room ${roomId}. ${playerName} could not join.`);
        return socket.emit('game-already-started');
    } 
    
    else {
        console.error(`Error joining room: ${success}`);
        socket.emit('join-error', 'Unknown error occurred');
    }
};

export const disconnectPlayer = (io, socket) => {
    const roomId = roomStore.removePlayer(socket.id);
    if (roomId) {
        const players = roomStore.getPlayers(roomId);
        if (players.length === 0) {
            gameStore.deleteGame(roomId);
            roomStore.deleteRoom(roomId)
        }  
        else io.to(roomId).emit('updated-players', players);
    } else {
        socket.emit('end-game', {io, socket, })
    }
};

export const getRoomPlayers = (io, socket, roomId) => {
    const players = roomStore.getPlayers(roomId);
    // console.log(`In roomController: Players in room ${roomId}:`, players);
    socket.emit('updated-players', players);
}

export const getRoomName = (io, socket, roomId) => {
    const roomName = roomStore.getRoomName(roomId);
    socket.emit('room-name-updated', roomName);
}

export const getMaxPlayers = (io, socket, roomId) => {
    const maxPlayers = roomStore.getMaxPlayers(roomId);
    socket.emit('max-players-updated', maxPlayers);
};