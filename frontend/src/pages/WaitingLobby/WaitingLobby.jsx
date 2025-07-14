import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { RoomContext } from "../../contexts/RoomContext";

import socket from "../../socket";

import './waitinglobby.css';
import PlayerCard from "../../components/PlayerCard/PlayerCard";

const WaitingLobby = () => {
    const { playerName, role } = useContext(PlayerContext);
    const { roomId, players, roomName } = useContext(RoomContext);
    
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
                <div></div>
            </div>
        </div>
    );
};

export default WaitingLobby;
