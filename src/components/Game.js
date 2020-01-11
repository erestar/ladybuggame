import React from "react";
import { useSelector } from "react-redux";
import Player from "./Player";
import { TurnIndicator } from "./TurnIndicator";
import TurnList from "./TurnList";

export const Game = ({spaces}) => {
    const {gameInProgress, players, currentPlayerIndex} = useSelector(state => ({
        currentPlayerIndex: state.currentPlayerIndex,
        players: state.players,
        gameInProgress: state.gameInProgress,
    }));

    if (!gameInProgress) { return null; }

    return (
    <div>
        {players.map((player, index) => (
            <Player currentPlayer={players[currentPlayerIndex]}  spaces={spaces} key={index} player={player} />
        ))}
        <TurnIndicator />
        <TurnList  />
    </div>

)};
