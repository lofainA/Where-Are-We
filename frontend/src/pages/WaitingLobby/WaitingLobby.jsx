import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { RoomContext } from "../../contexts/RoomContext";

import socket from "../../socket";

import './waitinglobby.css';

const WaitingLobby = () => {
    const { playerName, role } = useContext(PlayerContext);
    const { roomId, players, roomName } = useContext(RoomContext);
    
    // TODO: update players in roomcontext when start game is clicked

    return (
        <div className="waiting-lobby-container">
            <div className="waiting-lobby">
                <h1>Waiting Lobby for {roomName} </h1>
                <p>Welcome, {playerName}!</p>
                <p>Your role: {role}</p>
                <p>Waiting for other players to join...</p>
            </div>
            <div className="players-list">
                <h2>Players in Room:</h2>
                {players.length > 0 ? (
                    <ul>
                        {players.map((player, index) => (
                            <li key={index}>
                                {player.name} ({player.role})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No players in the room yet.</p>
                )}
            </div>
        </div>
    );
};

export default WaitingLobby;
