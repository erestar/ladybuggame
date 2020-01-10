import {START_GAME, TAKE_TURN} from "../actions"
import {shuffle, cards, engine, olivia, tommy, ella, ricky, Player} from '../engine'

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
    let players;

    switch (action.type) {
        case START_GAME:
            //todo move all this to the engine to initialize the game
            //Set up players todo Make this come from a form and ride in on the action
            players = [
                new Player('Jim', olivia),
                new Player('Anna', ella),
                new Player('Caroline', tommy)
            ];

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

            const activity = engine.resolveTurn(currentPlayer, deck);

            //Maybe this is a different method because it also needs players
            let nextPlayerIndex = (state.currentPlayerIndex + 1) % players.length;
            //^^

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
