import React from "react";

export const Card = ({card}) => {
    return (
        <>
            {card.type} - {card.magnitude}
        </>
    );
};

