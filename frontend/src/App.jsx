import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import CreateRoom from './pages/CreateRoom/CreateRoom';
import JoinRoom from './pages/JoinRoom/JoinRoom';
import LandingPage from './pages/LandingPage/LandingPage';
import WaitingLobby from './pages/WaitingLobby/WaitingLobby';

import { PlayerContext } from './contexts/PlayerContext';
import { RoomContext } from './contexts/RoomContext';

const App = () => {

    const navigate = useNavigate();

    const [playerName, setPlayerName] = useState('');
    const [role, setRole] = useState(''); // 'host' or 'player'

    const [roomId, setRoomId] = useState('');

    useEffect(() => {
        if(playerName.trim() === '') {
            setRole(''); // Reset role if playerName is empty
            navigate('/'); // Redirect to landing page
        }
    }, [playerName]);

    return (
        <PlayerContext.Provider value={{ playerName, setPlayerName, role, setRole }}>
            <RoomContext.Provider value={{ roomId, setRoomId }}>
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

