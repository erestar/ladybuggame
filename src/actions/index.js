export const START_GAME = 'START_GAME';
export const TAKE_TURN = 'TAKE_TURN';

export const startGame = (bugPlayers) => (
    {
        type: START_GAME,
        bugPlayers
    }
);

export const takeTurn = () => (
    {
        type: TAKE_TURN
    }
);
