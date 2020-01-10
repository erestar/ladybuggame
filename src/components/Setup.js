import React from "react";
import Player from "./Player";
import {connect} from "react-redux";
import {startGame} from "../actions";

const Setup = ({gameInProgress, onStartClick}) => {
    if (gameInProgress) { return null; }
    return (
        <div>
            <button onClick={onStartClick}>Start Game</button>
        </div>
    )};

const mapStateToProps = state => ({
    gameInProgress: state.gameInProgress
});

const mapDispatchToProps = dispatch => ({
    onStartClick: () => dispatch(startGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(Setup);

