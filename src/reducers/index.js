import {START_GAME, TAKE_TURN} from "../actions"
import {cards, engine, Engine, Player, shuffle} from '../engine'

/**
 *
 * @type {{currentPlayerIndex: null, gameInProgress: boolean, players: [], deck: [], turnActivity: []}}
 */
const initialState = {
    gameInProgress: false,
    players: [],
    currentPlayerIndex: null,
    turnActivity: [],
    deck: [],
};

const game = (state = initialState, action) => {
    let deck;
    let players = [];

    switch (action.type) {
        case START_GAME:

            //todo move all this to the engine to initialize the game
            //todo Sanitize / validate the input here
            Object.entries(action.bugPlayers).forEach(([key, value]) => {
                    if (value !== "") {
                        players.push(new Player(value, Engine.bugs[key]));
                    }
                }
            );

            //Put all players at the starting position
            players.forEach((player, index) => {
                player.currentSpace = engine.spaces[0].id;
            });

            //retrieve and shuffle the deck
            deck = [...cards];
            shuffle(deck);

            return {
                ...state,
                players: [...players],
                gameInProgress: true,
                deck: deck,
                turnActivity: [],
                currentPlayerIndex: 0
            };

        case TAKE_TURN:
            deck = [...state.deck];
            players = [...state.players];


            let currentPlayer = Object.assign(new Player(), players[state.currentPlayerIndex]);
            players[state.currentPlayerIndex] = currentPlayer;

            //Make sure deck is good //probably eligible for the engine
            if (state.deck.length === 0) {
                deck = [...cards];
                shuffle(deck);
            }

            //Resolve the turn, and figure out
            const activity = engine.resolveTurn(currentPlayer, deck, state.currentPlayerIndex, players);
            let nextPlayerIndex = activity.nextPlayerIndex;

            return Object.assign({}, state, {
                turnActivity: [...state.turnActivity, activity],
                deck: deck,
                players: players,
                currentPlayerIndex: nextPlayerIndex
            });

        default:
            return state;
    }
};

export default game;
