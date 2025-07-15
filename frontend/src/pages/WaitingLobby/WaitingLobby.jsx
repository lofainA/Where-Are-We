import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { RoomContext } from "../../contexts/RoomContext";

import socket from "../../socket";

import './waitinglobby.css';
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import { Button } from "../../components/Button/Button";

const WaitingLobby = () => {
    const { playerName, role } = useContext(PlayerContext);
    const { roomId, players, roomName, maxPlayers } = useContext(RoomContext);
    
    // TODO: update players in roomcontext when start game is clicked

    return (
        <div className="waiting-lobby-container">
            <div className="room-name-header">
                {roomName}
            </div>
            {players.length > 0 ? (
                <div className="players">
                    {players.map((player, index) => (
                        <PlayerCard playerName={player.name} role={player.role} key={index} />
                    ))}
                </div>
            ) : (
                <p>No players in the room yet.</p>
            )}
            
            <div className="player-count">
                <div className={`player-count-text ${players.length == maxPlayers ? 'max-reached' : ''}`}>
                    {players.length} / {maxPlayers}
                </div>
                {players.length >= maxPlayers && (
                    <div className="max-reached-label">
                        LOBBY IS FULL!
                    </div>
                )}
            </div>
            <div className="start-game-button-container">
                {role == "host" && (
                    <Button 
                        className={`start-game-button ${players.length >= 3 ? '' : 'disabled'}`}
                        text="Start Game" 
                        onClick={() => socket.emit("startGame", roomId)} />
                )}  
            </div>
        </div>
    );
};

export default WaitingLobby;
