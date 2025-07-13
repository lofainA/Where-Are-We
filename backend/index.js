import express, { json } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import setupSocket from './socket.js';
import roomRoutes from './routes/roomRoutes.js';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(json());
app.use('/api/rooms', roomRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

setupSocket(io); 

server.listen(4000, () => console.log('Server running on port 4000...'));
