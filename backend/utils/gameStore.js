import { generateGameId } from "./randomUtils";
import roomStore from "./roomStore";

const games = {
    // "randomlyGeneratedId": {
    //      roomId: "ABCDEF",
    //      players: [{ id: "123", name: "Aysha", role: "player", gameRole: "none" }],
    //      liar: "123" (some player id),
    //      location: "museum",
    //      currRound: 1,
    // }
};

const createNewGame = (roomId) => {
    let gameId = generateGameId();

    // Prevent duplicate gameIds
    while(games[gameId]) {
        gameId = generateGameId();
    }

    games[gameId] = {
        roomId: roomId,
        players: roomStore.getPlayers(roomId),
        liar: "",
        location: "",
        currRound: 1
    }
}

const assignRoles = (gameId) => {
    if(!games[gameId]) return null;
    
    const liar = Math.floor(Math.random() * games[gameId].players.length);
    const players = games[gameId].players;

    for(var i = 0; i < players.length; i++) {
        if(i != liar) {
            games[gameId].players[i].gameRole = 'real';
        } else {
            games[gameId].players[i].gameRole = 'liar';
        }
    }
}