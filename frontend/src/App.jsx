import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import CreateRoom from './pages/CreateRoom/CreateRoom';
import JoinRoom from './pages/JoinRoom/JoinRoom';
import LandingPage from './pages/LandingPage/LandingPage';
import WaitingLobby from './pages/WaitingLobby/WaitingLobby';

import { PlayerContext } from './contexts/PlayerContext';
import { RoomContext } from './contexts/RoomContext';

import socket from './socket';
import { use } from 'react';

const App = () => {

    const navigate = useNavigate();

    // Player state
    const [playerName, setPlayerName] = useState('');
    const [role, setRole] = useState(''); // 'host' or 'player'
    const [gameRole, setGameRole] = useState('none'); // 'liar' or 'real'

    // Room state
    const [roomId, setRoomId] = useState('');
    const [roomName, setRoomName] = useState('');
    const [players, setPlayers] = useState([]);
    const [maxPlayers, setMaxPlayers] = useState(4);

    useEffect(() => {
        if(playerName.trim() === '') {
            setRole(''); // Reset role if playerName is empty
            navigate('/'); // Redirect to landing page
        }
    }, [playerName]);

    useEffect(() => {
        const handleGameInitialized = ({ _, players }) => {
            for (let i = 0; i < players.length; i++) {
                if (players[i].id === socket.id) {
                    setGameRole(players[i].gameRole);
                    break;
                }
            }
        };
        socket.on('game-initialized', handleGameInitialized);
        return () => socket.off('game-initialized', handleGameInitialized);
    }, []);

    useEffect(() => {
        socket.emit('get-room-players', roomId);

        const handlePlayerUpdate = (newPlayers) => setPlayers(newPlayers);
        socket.on('updated-players', handlePlayerUpdate);

        return () => socket.off('updated-players', handlePlayerUpdate);
    }, [])

    useEffect(() => {
        socket.emit('get-room-name', roomId);

        const handleRoomNameUpdate = (name) => setRoomName(name);
        socket.on('room-name-updated', handleRoomNameUpdate);

        return () => socket.off('room-name-updated', handleRoomNameUpdate);
    }, [roomId]);

    useEffect(() => {
        socket.emit('get-max-players', roomId);

        const handleMaxPlayersUpdate = (max) => setMaxPlayers(max);
        socket.on('max-players-updated', handleMaxPlayersUpdate);

        return () => socket.off('max-players-updated', handleMaxPlayersUpdate);
    }, [roomId])

    return (
        <PlayerContext.Provider value={{ playerName, setPlayerName, role, setRole, gameRole, setGameRole }}>
            <RoomContext.Provider value={{ roomId, setRoomId, 
                                           roomName, setRoomName, 
                                           players, setPlayers, 
                                           maxPlayers, setMaxPlayers }}>
                <div className="app">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/create-room" element={<CreateRoom />} />
                        <Route path="/join-room" element={<JoinRoom />} />
                        <Route path="/waiting-lobby/:roomId" element={<WaitingLobby />} />
                        <Route path="/:roomId/game/:gameId" element={<Game />} />
                    </Routes>
                </div>
            </RoomContext.Provider>
        </PlayerContext.Provider>
    );
}

export default App;

