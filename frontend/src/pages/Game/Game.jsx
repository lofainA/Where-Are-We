import { useState, useEffect, useContext } from "react";

import RevealScreen from "./RevealScreen/RevealScreen";

import { GameContext } from "../../contexts/GameContext.js";
import { RoomContext } from "../../contexts/RoomContext.js";

import socket from '../../socket.js';

const Game = () => {

    const [gameStage, setGameStage] = useState(''); // Default stage
    const { gameId } = useContext(GameContext);
    const { roomId } = useContext(RoomContext);
    // const { game, setGame } = useState();

    useEffect(() => {
        socket.onAny((event, ...args) => {
            console.log(`Socket event: ${event}`, args);
        });
    }, []);

    // FIXME: stage not updating correctly, update-stage is being emitted but useEffect is not capturing it
    useEffect(() => {
        socket.emit('get-stage-status', gameId);
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