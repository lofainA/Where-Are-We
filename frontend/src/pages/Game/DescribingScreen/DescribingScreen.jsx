const DescribingScreen = () => {
    const { roomId, gameId } = useParams();
    const { players } = useContext(RoomContext); 
    const { role, gameRole } = useContext(PlayerContext);

    return (
        <div className="describing-screen">
            <h1>Describing Screen</h1>
            <p>Room ID: {roomId}</p>
            <p>Game ID: {gameId}</p>
            <p>Players: {players.join(", ")}</p>
            <p>Your Role: {role}</p>
            <p>Your Game Role: {gameRole}</p>
        </div>
    );
};

export default DescribingScreen;
