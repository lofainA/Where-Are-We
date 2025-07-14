import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import CreateRoom from './pages/CreateRoom/CreateRoom';
import JoinRoom from './pages/JoinRoom/JoinRoom';
import LandingPage from './pages/LandingPage/LandingPage';
import WaitingLobby from './pages/WaitingLobby/WaitingLobby';

import { PlayerContext } from './contexts/PlayerContext';
import { RoomContext } from './contexts/RoomContext';

import socket from './socket';

const App = () => {

    const navigate = useNavigate();

    // Player state
    const [playerName, setPlayerName] = useState('');
    const [role, setRole] = useState(''); // 'host' or 'player'

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
        <PlayerContext.Provider value={{ playerName, setPlayerName, role, setRole }}>
            <RoomContext.Provider value={{ roomId, setRoomId, roomName, setRoomName, players, setPlayers }}>
                <div className="app">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/create-room" element={<CreateRoom />} />
                        <Route path="/join-room" element={<JoinRoom />} />
                        <Route path="/waiting-lobby/:roomId" element={<WaitingLobby />} />
                    </Routes>
                </div>
            </RoomContext.Provider>
        </PlayerContext.Provider>
    );
}

export default App;

