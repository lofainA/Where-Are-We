import React, { useContext } from 'react';
import { PlayerContext } from '../../../contexts/PlayerContext';

const RevealScreen = () => {

    const { playerName, gameRole } = useContext(PlayerContext);

    return (
        <div>
            <h1>Reveal Page</h1>
            <p>Player Name: {playerName}</p>
            <p>Game Role: {gameRole}</p>
        </div>
    );
};

export default RevealScreen;
