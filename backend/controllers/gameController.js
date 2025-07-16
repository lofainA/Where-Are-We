import gameStore from "../utils/gameStore.js";
import roomStore from "../utils/roomStore.js";

export const initializeGame = (io, socket, roomId) => {
    // Create new game in game store
    // Initialize round number as 1
    // Assign a person as liar
    // Assign a location for the game
    // Every game can have a maximum of 3 rounds

    const gameId = gameStore.createNewGame(roomId);
    if(gameId === null) {
        return socket.emit('game-init-error', 'Game already exists for this room');
    }
    gameStore.assignRoles(gameId);
    gameStore.assignLocation(gameId);

    roomStore.rooms[roomId].game = gameId; // TODO: assign game to room (current task)
    // socket.emit('game-initialized', { gameId,  });
    io.to(roomId).emit('game-initialized', { gameId: gameId, players: gameStore.getPlayers(gameId) })
};

export const nextRound = (io, socket, { gameId }) => {
    const game = gameStore.getGame(gameId);
    if (!game) {
        return socket.emit('round-error', 'Game not found');
    }

    game.currRound += 1;
    if (game.currRound > 3) {
        return socket.emit('game-over', 'Game over after 3 rounds');
    }

    io.to(game.roomId).emit('round-updated', { round: game.currRound, location: gameStore.getLocation(gameId) });
}

export const endGame = (io, socket, { gameId }) => {
    const game = gameStore.getGame(gameId);
    if (!game) {
        return socket.emit('game-end-error', 'Game not found');
    }

    // Notify all players in the room about the game end
    io.to(game.roomId).emit('game-ended', { location: gameStore.getLocation(gameId) });

    // Clean up the game data
    delete gameStore.games[gameId];
}

// TODO: Remove player from game method

// TODO: Delete game if room is empty
