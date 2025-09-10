import { useEffect, useState, useContext } from 'react';

import { PlayerContext } from '../../../contexts/PlayerContext';
import { GameContext } from '../../../contexts/GameContext';
import { RoomContext } from '../../../contexts/RoomContext';

import './reveal-page.css';
import socket from '../../../socket';
import { useNavigate } from "react-router-dom";

const RevealScreen = () => {

    const navigate = useNavigate();

    const { roomId } = useContext(RoomContext);
    const { gameId } = useContext(GameContext);
    const { playerName, gameRole } = useContext(PlayerContext);
    const { location } = useContext(GameContext);
    const [locationImage, setLocationImage] = useState("https://dummyimage.com/600x400/000/fff&text=location-placeholder");

    useEffect(() => {
        console.log("Role: ", gameRole);
        console.log("Player name: ", playerName);

        socket.emit('get-location-image', location);
        console.log("Fetching location image for: ", location);

        const handleLocationImageUpdate = (data) => {
            setLocationImage(data.img);
            console.log("Location image url: ", data.img);
        }

        socket.on('location-image', handleLocationImageUpdate);
        return () => {
            socket.off('location-image', handleLocationImageUpdate);
        };

    }, [location]);

    useEffect(() => {
        const timer = setTimeout(() => {
            socket.emit('change-stage', {roomId, newStage: "describing"});
            console.log("Navigating to describing screen");
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        // <div>
        //     <h1>Reveal Page</h1>
        //     <p>Player Name: {playerName}</p>
        //     <p>Game Role: {gameRole}</p>
        // </div>
        <div className="reveal-screen">
            {gameRole === 'real' && (
                <div className="reveal-location-message">
                    <div className='reveal-title'>
                        <div className='reveal-subtitle'>You are in...</div>
                        <div className='reveal-location'>A {location}</div>
                    </div>
                    <div className='image-stack'>
                        <img src={locationImage} alt="location image" className='location-image' />
                    </div>
                </div>
            )}
            {gameRole === 'liar' && (
                <div className='reveal-liar-message'>
                    <div className='reveal-liar-title'>
                        <div style={{fontSize: "1.7rem"}}>You are...</div>
                        <div className='liar-shit'>The <div style={{color: "#FF7F7F"}}> Liar</div></div>
                    </div>
                    <div style={{ color: "#AE9BCB", fontSize: "1.7rem", width: "30%",textAlign: "center" }}>Don’t let the others know that you don’t know shit</div>
                    <div style={{fontSize: "1.9rem"}}>Try to guess where you are</div>
                </div>
            )}
        </div>
    );
};

export default RevealScreen;
