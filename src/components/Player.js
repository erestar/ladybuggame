import React from 'react';
import classNames from 'classnames';
import {Space} from './Space';


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

        <div className="space">
            <Space space={spaces[player.currentSpace]}/>
        </div>
    </div>
);

export default Player;