import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../../contexts/PlayerContext";

import { Button } from "../../components/Button/Button";
import "./style.css";

const LandingPage = () => {

    const { playerName, setPlayerName } = useContext(PlayerContext);

    const navigate = useNavigate();

    const createRoom = () => {
        // socket.emit('createRoom')
        navigate("/create-room");
    }

    const joinRoom = () => {
        // socket.emit('joinRoom')
        navigate("/join-room");
    }
    
    return ( 
        <div className="container">
            <div className="header">
                <div className="title">Where are We?</div>
                <div className="subtitle">Play with your friends and guess who does not have a clue about where they are</div>
            </div>
            <div className="player-name-input">
                <div className="nickname-label">Nickname</div>
                <input 
                    className="nickname-input" 
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
            </div>
            <div className="room-buttons">
                <Button className="create-room" text="Create Room" onClick={createRoom} />
                <Button className="join-room" text="Join Room" onClick={joinRoom} />
            </div>
        </div>
    );
}

export default LandingPage;