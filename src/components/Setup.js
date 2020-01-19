import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {startGame} from "../actions";
import {Engine} from "../engine"
import {useForm} from "react-hook-form";


const PlayerFormSection = ({bug, register}) => {

    return (
        <div className="playerSection">
            <br/>
            <label htmlFor="playerName">
                Who plays {bug.name}?
            </label>
            <br/>
            <input placeholder="No one" name={bug.cssClass} ref={register}/>
        </div>
    );

};

const PlayersForm = () => {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const onSubmit = data => {
        dispatch(startGame(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(Engine.bugs).map((value, index) => {
                return (
                    <PlayerFormSection register={register} key={index} bug={Engine.bugs[value]}/>
                );
            })}
            <button type="submit">Start Game!</button>
        </form>
    );
};

const AutoPlayForm = () => {
    const dispatch = useDispatch();


};


export const Setup = () => {
    const gameInProgress = useSelector((state) => (state.gameInProgress));

    if (gameInProgress) {
        return null;
    }
    return (
        <>
            <PlayersForm/>
            <hr/>
            <AutoPlayForm/>

        </>
    )
};

