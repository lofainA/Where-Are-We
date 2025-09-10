import { useState, useEffect, useContext } from "react";

import RevealScreen from "./RevealScreen/RevealScreen";

import { GameContext } from "../../contexts/GameContext.js";
import { RoomContext } from "../../contexts/RoomContext.js";

import socket from '../../socket.js';

const Game = () => {

    const [gameStage, setGameStage] = useState(''); // Default stage
    const { gameId, setLocation, setLiar } = useContext(GameContext);
    const { roomId } = useContext(RoomContext);
    const [game, setGame] = useState();

    const [screen, setScreen] = useState(<div><h1>Loading...</h1></div>);

    useEffect(() => {
        const logEvent = (event, ...args) => {
            console.log(`Socket event: ${event}`, args);
        };
        socket.onAny(logEvent);
        return () => {
            socket.offAny(logEvent);
        };
    }, []);

    // Get current game stage and game details

    // Effect for updating game stage
    useEffect(() => {
        console.log("Updating stage for ", gameId);
        socket.emit('get-stage-status', gameId);

        const gameStageSetup = (newStage) => {
            setGameStage(newStage);
            console.log("Game stage updated to:", newStage);
        };

        socket.on('update-stage', gameStageSetup);
        return () => {
            socket.off('update-stage', gameStageSetup);
        };
    }, [gameId]);

    // Effect for game details
    useEffect(() => {
        console.log("Getting game for ", gameId);
        socket.emit('get-game', gameId);

        const gameSetup = (newGame) => {
            setGame(newGame);
            console.log('Game details: ', newGame);
        };

        socket.on('game-details', gameSetup);
        return () => {
            socket.off('game-details', gameSetup);
        };
    }, [gameId]);

    // Set game location and liar
    useEffect(() => {
        console.log("Setting game location...")
        if (game) {
            setLocation(game.location);
            setLiar(game.liar);
            console.log("Set game location as ", game.location);
        }
    }, [game]);

    // Dynamically render the screen based on gameStage
    useEffect(() => {
        if (gameStage === 'reveal-roles') {
            setScreen(<RevealScreen />);
        } else if (gameStage === 'describing') {
            setScreen(<DescribingScreen />);
        }
    }, [gameStage]);
    
    

    return (
        <div>
            {screen}
        </div>
    );
}

export default Game;