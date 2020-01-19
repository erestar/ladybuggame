import React from "react";
import {pluralize} from "../engine";

const MoveCard = ({card}) => {
    return (
        <div>
            {`Move ahead ${pluralize('space', Math.abs(card.magnitude))}!`}
            {card.goAgain ? ' Go Again' : ''}
        </div>
    );
};

const AphidCard = ({card}) => {
    return (
        <div>
            {`You ${card.magnitude > 0 ? 'gain' : 'loose' } ${pluralize('aphid', Math.abs(card.magnitude))}!`}
        </div>
    );
};

export const Card = ({card}) => {
    return (card.type === 'move')? <MoveCard card={card} /> : <AphidCard card={card} />
};

