import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PlayerContext } from "../../contexts/PlayerContext";
import { RoomContext } from "../../contexts/RoomContext";

import { Button } from "../../components/Button/Button";
import socket from "../../socket";

import './joinroom.css';

const JoinRoom = () => {

    const navigate = useNavigate();

    const { playerName, setRole } = useContext(PlayerContext);
    const { setRoomId } = useContext(RoomContext);

    const [code, setCode] = useState("");
    const [disabled, setDisabled] = useState(false);

    const handleRoomJoin = () => {
        if (disabled || !code) return;

        setDisabled(true); // Disable button to prevent multiple clicks
        setRole('player'); // Set role to player when joining a room

        console.log(playerName, " is joining room with code:", code);
        socket.emit('join-room', {
            roomId: code,
            playerName
        });

        socket.on('joined-successfully', (roomId) => {
            setRoomId(roomId);
            console.log(playerName, "has joined room with ID:", roomId);
            navigate(`/waiting-lobby/${roomId}`);
        });

    }

    return (
        <div className="join-room-page">
            <div className="room-code-label">Enter Room Code</div>
            <input 
                type="text" 
                className="room-code-input"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <Button 
                className={disabled ? 'join-btn disabled' : 'join-btn'}
                text="Join Room"
                onClick={handleRoomJoin}
            />
        </div>
    );
}

export default JoinRoom;