import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { PlayerContext } from "../../contexts/PlayerContext";
import { RoomContext } from "../../contexts/RoomContext";
import { GameContext } from "../../contexts/GameContext";

import socket from "../../socket";

import './waitinglobby.css';
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import { Button } from "../../components/Button/Button";

const WaitingLobby = () => {
    const navigate = useNavigate();
    const { role } = useContext(PlayerContext);
    const { roomId, players, roomName, maxPlayers } = useContext(RoomContext);
    const { setGameId } = useContext(GameContext)
    
    // TODO: update players in roomcontext when start game is clicked

    // BUG: host not getting updated about players on inital join

    const handleGameStart = () => {
        if (role !== 'host') return;    
        socket.emit("start-game", roomId);
    }

    useEffect(() => {
        const handleGameInitialized = ({ gameId, _ }) => {
            setGameId(gameId);
            navigate(`/${roomId}/game/${gameId}`)
        };
        
        socket.on("game-initialized", handleGameInitialized);
        return () => socket.off("game-initialized", handleGameInitialized);
    }, [])

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
                        onClick={handleGameStart} />
                )}  
            </div>
            <div className="lobby-code">
                <div className="code">{roomId}</div>
            </div>
        </div>
    );
};

export default WaitingLobby;
