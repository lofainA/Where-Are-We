import express from 'express';
const router = express.Router();
import roomStore from '../utils/roomStore.js';

// GET all rooms
router.get('/', (req, res) => {
  const rooms = roomStore.getAllRooms();
  res.json(rooms);
});

// GET a specific room's players
router.get('/:roomId', (req, res) => {
  const { roomId } = req.params;
  const players = roomStore.getPlayers(roomId);
  if (!players.length) return res.status(404).json({ error: 'Room not found' });
  res.json(players);
});

export default router;

