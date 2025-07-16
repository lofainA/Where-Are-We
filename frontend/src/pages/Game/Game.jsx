import { useState, useEffect } from "react";

import RevealScreen from "./RevealScreen/RevealScreen";

import socket from '../../socket.js';

const Game = () => {

    const [gameStage, setGameStage] = useState(''); // Default stage

    console.log("Game component mounted, socket connected?", socket.connected);

    useEffect(() => {
        socket.onAny((event, ...args) => {
            console.log(`🔍 Received socket event: ${event}`, args);
        });
    }, []);

    // FIXME: stage not updating correctly, update-stage is being emitted but useEffect is not capturing it
    useEffect(() => {
        const gameStageSetup = (newStage) => {
            setGameStage(newStage);
            console.log("Game stage updated to:", newStage);
        }
        socket.on('update-stage', gameStageSetup);
        return () => socket.off('update-stage', gameStageSetup);
    }, []);

    return (
        <div>
            {/* {gameStage === 'waiting' && <WaitingRoom />} */}
            {gameStage === 'reveal-roles' && <RevealScreen />}
            {/* {gameStage === 'question' && <QuestionScreen />}
            {gameStage === 'voting' && <VotingScreen />}
            {gameStage === 'result' && <ResultScreen />} */}
        </div>
    );
}

export default Game;