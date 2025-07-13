import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button/Button";

import socket from "../../socket";
import "./createroom.css";

import { PlayerContext } from "../../contexts/PlayerContext";
import { RoomContext } from "../../contexts/RoomContext";

const CreateRoom = () => {

    const navigate = useNavigate();

    const { playerName, setRole } = useContext(PlayerContext);
    const { roomId, setRoomId } = useContext(RoomContext);

    const [roomName, setRoomName] = useState("");
    const [maxPlayers, setMaxPlayers] = useState(4);
    const [liarCount, setLiarCount] = useState(1);
    const [maxLiarCount, setMaxLiarCount] = useState(3);
    const [disabled, setDisabled] = useState(false);

    const handleRoomCreation = () => {
        if (disabled) return;
        console.log("Room created from frontend");

        setDisabled(true);
        setRole('host'); // Set role to host when creating a room

        // Logic to handle room creation
        socket.emit('create-room', {
            roomName,
            maxPlayers,
            liarCount,
            playerName
        });

        socket.off('room-created'); // Remove any previous listeners
        socket.on('room-created', (newRoomId) => {
            setRoomId(newRoomId);
            console.log(playerName, "has created room with ID:", newRoomId);
            navigate(`/waiting-lobby/${newRoomId}`);
        });
    }

    useEffect(() => {
        // Update maxLiarCount based on maxPlayers
        // console.log("Max Players:", maxPlayers);
        setMaxLiarCount(maxPlayers - 2);
        // console.log("Max Liars Count:", maxLiarCount);
    }, [maxPlayers]);

    return (
        <div className="create-room-page">
            <div className="room-name-container">
                <div className="room-name-label">Room Name</div>
                <input 
                    type="text" 
                    className="room-name-input"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)} />
            </div>
            <div className="room-settings">
                <div className="setting">
                    <label htmlFor="max-players">Max Players</label>
                    <input 
                        type="number" 
                        id="max-players" 
                        min="3" 
                        max="9" 
                        value={maxPlayers} 
                        onChange={(e) => setMaxPlayers(e.target.value)} />
                </div>
                <div className="setting">
                    <label htmlFor="liar-count">No.of Liars</label>
                    <input 
                        type="number" 
                        id="liar-count" 
                        min="1" 
                        max={maxLiarCount} 
                        value={liarCount} 
                        onChange={(e) => setLiarCount(e.target.value)} />
                </div>
            </div>
            <div className="create-room-button">
                <Button 
                    className={disabled ? 'create-btn disabled' : 'create-btn'}
                    text="Create" 
                    onClick={handleRoomCreation} />
            </div>
        </div>
    );
}

export default CreateRoom;