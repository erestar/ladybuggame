import React from 'react';
import classNames from 'classnames';

const AphidIndicator = ({aphidCount}) => {
    if (!aphidCount) { return null; }

    return (<> You {aphidCount > 0 ? 'get' : 'loose' } {aphidCount} Aphids</>);
};

const MantisPassGranter = ({grantsMantisPass}) => {
    if (!grantsMantisPass) { return null; }

    return (<>{grantsMantisPass ? 'You get a MANTIS PASS' : ''} </>);
};

const Space = ({space}) => (
    <div className="space">
        Space #{space.id}
        <br/>
        <AphidIndicator aphidCount={space.aphidChange} />
        <br/>
        <MantisPassGranter grantsMantisPass={space.grantsMantisPass} />
    </div>
);

/**
 *
 * @param {Player} currentPlayer
 * @param {Player} player
 * @param {Space[]}spaces
 */
const Player = ({currentPlayer, player, spaces}) => (
    <div className={classNames({
        'player': true,
        'currentPlayer': currentPlayer === player
    })}>
        Name: {player.bug.name} ({player.name})
        <br/>
        Aphid count: {player.aphids}
        <br/>
        Mantis passes: {player.passes}
        <Space space={spaces[player.currentSpace]} />
    </div>
);

export default Player;