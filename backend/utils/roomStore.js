import { generateRoomId } from './randomUtils.js';

const rooms = {
    // Example:
    // 'ABCDEF': {
    //     roomName: "Madlads",
    //     players: [{ id: "123", name: "Aysha", role: "guesser" }]
    //     maxPlayers: 9,
    //     liarCount: 2
    // }
};

const createNewRoom = (roomName, maxPlayers, liarCount) => {
    let roomId = generateRoomId();
    while (rooms[roomId]) {
        roomId = generateRoomId();
    }

    rooms[roomId] = {
        roomName,
        maxPlayers,
        liarCount,
        players: []
    };

    return roomId;
};

const addPlayerToRoom = (roomId, socketId, name, role) => {
    if (!rooms[roomId]) return "room not found";

    const room = rooms[roomId];
    if (room.players.length >= room.maxPlayers) return "room is full";

    room.players.push({ id: socketId, name, role });
    return "success";
};

const getPlayers = (roomId) => {
    return rooms[roomId]?.players || [];
};

const getRoomName = (roomId) => {
    return rooms[roomId]?.roomName || "Eror: Room not found";
}

const removePlayer = (socketId) => {
    for (const roomId in rooms) {
        const players = rooms[roomId].players;
        const before = players.length;

        const updatedPlayers = [];
        for (let i = 0; i < players.length; i++) {

            // If the host is leaving, handle room deletion or reassigning host
            if(players[i].id === socketId && players[i].role === 'host') {
                if (players.length === 1) {
                    deleteRoom(roomId); // Delete room if no players left
                    return null; // No room left
                } else {
                    players[i + 1].role = 'host'; // Reassign host role to next player
                }
            }
            if (players[i].id !== socketId) {
                updatedPlayers.push(players[i]);
            }
            
        }
        rooms[roomId].players = updatedPlayers;

        if (rooms[roomId].players.length < before) return roomId;
    }
    return null;
};

const deleteRoom = (roomId) => {
    delete rooms[roomId];
};

const getAllRooms = () => {
  return rooms;
}

export default {
    createNewRoom,
    addPlayerToRoom,
    getPlayers,
    getRoomName,
    getAllRooms,
    removePlayer,
    deleteRoom
};

