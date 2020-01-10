export const START_GAME = 'START_GAME';
export const TAKE_TURN = 'TAKE_TURN';

export const startGame = () => (
    {
        type: START_GAME
    }
);

export const takeTurn = () => (
    {
        type: TAKE_TURN
    }
);
