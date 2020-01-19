import game from '../reducers/index'
import {START_GAME, TAKE_TURN} from "../actions";
import seedrandom from "seedrandom";


describe('reducer', () => {

    it('should return the initial state', () => {
        expect(game(undefined, {})).toEqual({
            gameInProgress: false,
            players: [],
            currentPlayerIndex: null,
            turnActivity: [],
            deck: []
        })
    });


    //Need to seed the random number generator to get consistent results for this test.
    seedrandom('a', { global: true });
    it('Initialize the board with 3 players', () => {
        expect(game(null, {
            type: START_GAME,
            bugPlayers: {
                olivia: "Jim",
                ella: 'Anna',
                tommy: 'Caroline'
            }
        })).toMatchObject({
            gameInProgress: true,
            turnActivity: [],
            players: [
                {
                    name: 'Jim',
                    bug: {
                        name: 'Olivia Orange',
                        cssClass: 'olivia'
                    },
                    aphids: 0,
                    passes: 0,
                    currentSpace: 0
                },
                {
                    name: 'Anna',
                    bug: {
                        name: 'Ella Yellow',
                        cssClass: 'ella'
                    },
                    aphids: 0,
                    passes: 0,
                    currentSpace: 0
                },
                {
                    name: 'Caroline',
                    bug: {
                        name: 'Tommy Teal',
                        cssClass: 'tommy'
                    },
                    aphids: 0,
                    passes: 0,
                    currentSpace: 0
                }
            ],
            currentPlayerIndex: 0,
            deck: [
                {
                    type: 'move',
                    magnitude: -4,
                    goAgain: true
                },
                {
                    type: 'move',
                    magnitude: 3,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 2,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: -2,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: -3,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 2,
                    goAgain: true
                },
                {
                    type: 'move',
                    magnitude: 1,
                    goAgain: false
                },
                {
                    type: 'aphid',
                    magnitude: 2,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 4,
                    goAgain: true
                },
                {
                    type: 'move',
                    magnitude: 1,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 1,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 2,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 2,
                    goAgain: true
                },
                {
                    type: 'move',
                    magnitude: 2,
                    goAgain: false
                },
                {
                    type: 'aphid',
                    magnitude: -2,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 2,
                    goAgain: true
                },
                {
                    type: 'move',
                    magnitude: 4,
                    goAgain: true
                },
                {
                    type: 'move',
                    magnitude: 4,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 5,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 3,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 3,
                    goAgain: true
                },
                {
                    type: 'aphid',
                    magnitude: 1,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: -4,
                    goAgain: true
                },
                {
                    type: 'move',
                    magnitude: 3,
                    goAgain: true
                },
                {
                    type: 'move',
                    magnitude: 2,
                    goAgain: true
                },
                {
                    type: 'aphid',
                    magnitude: 3,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 3,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 5,
                    goAgain: false
                },
                {
                    type: 'aphid',
                    magnitude: 3,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 4,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 1,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 3,
                    goAgain: true
                },
                {
                    type: 'move',
                    magnitude: 2,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: -1,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 6,
                    goAgain: false
                },
                {
                    type: 'aphid',
                    magnitude: 3,
                    goAgain: false
                },
                {
                    type: 'aphid',
                    magnitude: -1,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 3,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 6,
                    goAgain: false
                },
                {
                    type: 'move',
                    magnitude: 4,
                    goAgain: false
                }
            ]
        })
    });

    it('Play 10 rounds', () => {
        seedrandom('a', { global: true });

        expect(function () {
                let state = game(null, {
                    type: START_GAME,

                    bugPlayers: {
                        olivia: "Jim",
                        ella: 'Anna',
                        tommy: 'Caroline'
                    }

                });
                state = game(state, {type: TAKE_TURN});
                state = game(state, {type: TAKE_TURN});
                state = game(state, {type: TAKE_TURN});
                state = game(state, {type: TAKE_TURN});
                state = game(state, {type: TAKE_TURN});
                state = game(state, {type: TAKE_TURN});
                state = game(state, {type: TAKE_TURN});
                state = game(state, {type: TAKE_TURN});
                state = game(state, {type: TAKE_TURN});
                state = game(state, {type: TAKE_TURN});
                return state;
            }()
        )
            .toMatchObject({
                players: [
                    {
                        name: 'Jim',
                        bug: {
                            name: 'Olivia Orange',
                            cssClass: 'olivia'
                        },
                        aphids: 3,
                        passes: 1,
                        currentSpace: 3
                    },
                    {
                        name: 'Anna',
                        bug: {
                            name: 'Ella Yellow',
                            cssClass: 'ella'
                        },
                        aphids: 10,
                        passes: 0,
                        currentSpace: 15
                    },
                    {
                        name: 'Caroline',
                        bug: {
                            name: 'Tommy Teal',
                            cssClass: 'tommy'
                        },
                        aphids: 6,
                        passes: 1,
                        currentSpace: 4
                    }
                ],
                currentPlayerIndex: 0,
            });
    });
});
