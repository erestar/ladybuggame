import React from "react";
import {takeTurn} from "../actions";
import {useDispatch, useSelector} from "react-redux";

export const TurnIndicator = () => {
    const currentPlayer = useSelector(state => state.players[state.currentPlayerIndex]);
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch(takeTurn())}>Your
                Turn <span>{currentPlayer.bug.name}</span> ({currentPlayer.name})
            </button>
        </div>);
};

