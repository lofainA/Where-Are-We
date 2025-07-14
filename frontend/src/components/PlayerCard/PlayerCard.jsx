import { useState, useContext, useEffect } from "react";

import "./player-card.css";

const PlayerCard = ({ playerName, role }) => {
    return (
        <div className="player-card">
            <div className="player-name">{playerName}</div>
        </div>
    );
};

export default PlayerCard;