import express from 'express';
const router = express.Router();
import gameStore from '../utils/gameStore.js';
import roomStore from '../utils/roomStore.js';

// GET all games
router.get('/all-games', (req, res) => {
    console.log("All games api");
    const games = gameStore.getAllGames();
    res.json(games);
});

// Create a game (testing)
router.get('/create-game', (req, res) => {
    const roomId = roomStore.createNewRoom("Tester", 4, 1);

    roomStore.addPlayerToRoom(roomId, 12345, "Aysha", "host");
    roomStore.addPlayerToRoom(roomId, 23456, "Abdul", "player");
    roomStore.addPlayerToRoom(roomId, 34567, "Selena", "player");
    roomStore.addPlayerToRoom(roomId, 45678, "Selena", "player");

    const gameId = gameStore.createNewGame(roomId)

    console.log("Room: " + roomId);
    console.log("Game: " + gameId);

    // if(gameStore.getGame(gameId) == null) res.json({});
    gameStore.assignRoles(gameId);
    gameStore.assignLocation(gameId);
    // res.json(gameStore.getPlayers(gameId));
    res.json(gameStore.getGame(gameId));
});

// GET a specific game's details
router.get('/:gameId', (req, res) => {
    const { gameId } = req.params;
    res.json(gameStore.getGame[gameId]);
});

export default router;