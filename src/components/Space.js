import React from "react";

const AphidIndicator = ({aphidCount}) => {
    if (!aphidCount) {
        return null;
    }

    return (<> You {aphidCount > 0 ? 'get' : 'loose'} {aphidCount} Aphids</>);
};

const MantisPassGranter = ({grantsMantisPass}) => {
    if (!grantsMantisPass) {
        return null;
    }

    return (<>{grantsMantisPass ? 'You get a MANTIS PASS' : ''} </>);
};

export const Space = ({space}) => (
    <>
        Space #{space.id}
        <br/>
        <AphidIndicator aphidCount={space.aphidChange}/>
        <br/>
        <MantisPassGranter grantsMantisPass={space.grantsMantisPass}/>
    </>
);
