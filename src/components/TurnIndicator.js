import React from "react";
import {connect} from "react-redux";
import {takeTurn} from "../actions";

const TurnIndicator = ({currentPlayer, onTakeTurnClick}) => (
    <div>
        <button onClick={onTakeTurnClick}>Your Turn <span>{currentPlayer.bug.name}</span> ({currentPlayer.name})
        </button>
    </div>
);

const mapStateToProps = state => ({
    currentPlayer: state.players[state.currentPlayerIndex]
});

const mapDispatchToProps = dispatch => ({
    onTakeTurnClick: () => dispatch(takeTurn())
});

export default connect(mapStateToProps, mapDispatchToProps)(TurnIndicator);

