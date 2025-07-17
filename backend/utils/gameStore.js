import { generateGameId } from "./randomUtils.js";
import roomStore from "./roomStore.js";

const games = {
    // "randomlyGeneratedId": {
    //      roomId: "ABCDEF",
    //      players: [{ id: "123", name: "Aysha", role: "player", gameRole: "none" }],
    //      liar: "123" (some player id),
    //      location: "museum",
    //      currRound: 1,
    //      stage: currStage
    // }
};

const locations = [
    "museum", "park", "restaurant",
    "hospital", "school", "library",
    "cinema", "beach", "zoo",
    "market", "stadium", "amusement park",
    "aquarium", "art gallery",
    "nursery", "bakery", "cafe",
    "gym", "pharmacy", "supermarket",
    "bank", "police station", "fire station",
    "train station", "airport", 
];

const createNewGame = (roomId) => {
    // Check if a game already exists for this room
    for (const id in games) {
        if (games[id].roomId === roomId) {
            return null;
        }
    }
    let gameId = generateGameId();

    // Prevent duplicate gameIds
    while (games[gameId]) {
        gameId = generateGameId();
    }
    games[gameId] = {
        roomId: roomId,
        players: roomStore.getPlayers(roomId),
        liar: "",
        location: "",
        currRound: 1,
        stage: "reveal-roles"
    };
    // .log("Created Game: ", games[gameId]);
    return gameId;
}

const assignRoles = (gameId) => {
    if(!games[gameId]) return null;
    
    const liar = Math.floor(Math.random() * games[gameId].players.length);
    const players = games[gameId].players;
    // console.log("Assign roles method: ");
    console.log("Game Id: " + gameId);
    // console.log("Players: " + players)

    for(var i = 0; i < players.length; i++) {
        if(i != liar) {
            games[gameId].players[i].gameRole = 'real';
        } else {
            games[gameId].players[i].gameRole = 'liar';
        }
    }
    //console.log("Liar: ", players[liar]); // Testing
    games[gameId].liar = players[liar].id;
    console.log(`Assigned roles for game ${gameId}:`, games[gameId].players);
}

const assignLocation = (gameId) => {
    if(!games[gameId]) return null;
    if(games[gameId].location != "") return; // Location already assigned
    const randomIndex = Math.floor(Math.random() * locations.length);
    games[gameId].location = locations[randomIndex];
    return games[gameId].location;
}

const deleteGame = (roomId) => {
    for (const gameId in games) {
        if (games[gameId].roomId === roomId) {
            delete games[gameId];
            return;
        }
    }
}

const getAllGames = () => {
    return games;
}

const getGame = (gameId) => {
    return games[gameId] || null;
};

const getPlayers = (gameId) => {
    return games[gameId]?.players || null;
};

const getLiar = (gameId) => {
    return games[gameId]?.liar || null;
};

const getLocation = (gameId) => {
    return games[gameId]?.location || null;
};

const getCurrRound = (gameId) => {
    return games[gameId]?.currRound || null;
};

export default {
    createNewGame,
    assignRoles,
    assignLocation,
    getGame,
    getPlayers,
    getLiar,
    getLocation,
    getCurrRound,
    getAllGames,
    deleteGame
}