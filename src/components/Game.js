import React from "react";
import Player from "./Player";
import {connect} from "react-redux";
import TurnIndicator from "./TurnIndicator";
import TurnList from "./TurnList";

const Game = ({gameInProgress, players, currentPlayer, playerMap, spaces  }) => {
    if (!gameInProgress) { return null; }

    return (
    <div>
        {players.map((player, index) => (
            <Player currentPlayer={currentPlayer}  spaces={spaces} key={index} player={player} />
        ))}
        <TurnIndicator />
        <TurnList  />
    </div>

)};

const mapStateToProps = state => ({
    currentPlayer: state.currentPlayer,
    players: state.players,
    playerMap: state.playerMap,
    gameInProgress: state.gameInProgress,
});

export default connect(mapStateToProps)(Game);
