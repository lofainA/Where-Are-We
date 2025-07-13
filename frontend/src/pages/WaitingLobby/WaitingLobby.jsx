import React, { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import './waitinglobby.css';

const WaitingLobby = () => {
    const { playerName, role } = useContext(PlayerContext);

    return (
        <div>
            <div className="waiting-lobby">
                <h1>Waiting Lobby</h1>
                <p>Welcome, {playerName}!</p>
                <p>Your role: {role}</p>
                <p>Waiting for other players to join...</p>
            </div>
        </div>
    );
};

export default WaitingLobby;
