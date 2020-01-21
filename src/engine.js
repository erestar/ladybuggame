export const cardTypes = {
    APHID: 'aphid',
    MOVE: 'move'
};

class Space {

    passThru = null;
    landOn = [];
    endOn = null;

    constructor(id, forward = null, back = null, options = {
                    aphidChange: 0,
                    looseATurn: false,
                    mantisPass: 0,
                    isMantis: false,
                    shortCutTo: null,
                    antsFee: 0,
                    isHome: false
                }
    ) {
        this.id = id;

        this.forward = forward ? forward : id + 1;
        this.back = back !== null ? back : id - 1;

        this.grantsMantisPass = options.mantisPass;
        this.aphidChange = options.aphidChange;
        this.looseATurn = options.looseATurn;

        this.isMantis = options.isMantis;
        if (this.isMantis) {
            this.landOn.push(
                (/** Player */ player) => {
                    //This should only get evaluated as soon as we hit the space. So you need to have a pass when you get here, not when you leave it.

                    //We have a pass. Take it and leave you alone
                    if (player.passes > 0) {
                        player.passes--;
                        return;
                    }

                    //Back to the start. That's OK, that's part of the fun.
                    player.currentSpace = 0;
                });
        }

        this.isHome = options.isHome;
        if (this.isHome) {
            //if we're home, set forward to null, which is only allowed on this square, so the move method on the engine doesn't proceed
            this.forward = null;

            this.landOn.push(() => {
                //todo introduce some toggle on the player indicating he's home, and then we'll s
                console.log('YOU GOT HOME');
            });
        }
    }

}

export class Card {
    constructor(cardType, magnitude, goAgain = false) {
        this.type = cardType;
        this.magnitude = magnitude;
        this.goAgain = goAgain;
    }

    replicate(copies) {
        return Array(copies).fill().map(u => Object.assign({}, this));
    }
}

class Bug {
    constructor(name, cssClass) {
        this.name = name;
        this.cssClass = cssClass;
    }
}

class TurnResolution {
    constructor(actingPlayer, nextPlayerIndex, card, space) {
        this.player = actingPlayer;
        this.nextPlayerIndex = nextPlayerIndex;
        this.card = card;
        this.space = space;
    }
}


export class Player {
    /**
     * @param name
     * @param {Bug} bug
     */
    constructor(name = null, bug = null) {
        this.name = name;
        this.bug = bug;
        this.aphids = 0;
        this.passes = 0;
        this.currentSpace = 0;
    }

    adjustAphids(magnitude) {
        this.aphids += magnitude;
        this.aphids = Math.max(this.aphids, 0);
    }
}

function generateStandardSpaces() {

    const spaces = [];
    spaces.push(new Space(0,1, 0, 0,0)); //Can't go further back than start
    spaces.push(new Space(1, null, null, { mantisPass: 1}));
    spaces.push(new Space(2));
    spaces.push(new Space(3,null,null,{ aphidChange: 3}));
    spaces.push(new Space(4,null,null,{ mantisPass: 1}));
    spaces.push(new Space(5));

    const shortcutSpace = new Space(6);
    shortcutSpace.endOn = (/**Player*/ player) => {
        player.currentSpace = 13; //todo this is only coincidentally working, since it's just a cooincidence that the ids line up with the array indexes
    };
    spaces.push(shortcutSpace);

    spaces.push(new Space(7));
    spaces.push(new Space(8));

    spaces.push(new Space(9, null, null, { isMantis: true }));

    spaces.push(new Space(10));
    spaces.push(new Space(11));
    spaces.push(new Space(12));
    spaces.push(new Space(13, null, null, { aphidChange: 2 }));
    spaces.push(new Space(14));
    spaces.push(new Space(15, null, null,{ aphidChange: 5 }));
    spaces.push(new Space(16));
    spaces.push(new Space(17));
    spaces.push(new Space(18));
    spaces.push(new Space(19));
    spaces.push(new Space(20));
    spaces.push(new Space(21));
    spaces.push(new Space(22));
    spaces.push(new Space(23));
    spaces.push(new Space(24));
    spaces.push(new Space(25));
    spaces.push(new Space(26));
    spaces.push(new Space(27));
    spaces.push(new Space(28));
    spaces.push(new Space(29));
    spaces.push(new Space(30));
    spaces.push(new Space(31));
    spaces.push(new Space(32));
    spaces.push(new Space(33));
    spaces.push(new Space(34));
    spaces.push(new Space(35));
    spaces.push(new Space(36));
    spaces.push(new Space(37));
    spaces.push(new Space(38));
    spaces.push(new Space(39));
    spaces.push(new Space(40));
    spaces.push(new Space(41, null, null, { isHome: true}));

    return spaces;
}

export class Engine {
    constructor(spaceGenerator) {
        this.currentPlayerIndex = null;

        /**
         *
         * @type {Space[]}
         */
        this.spaces = spaceGenerator();
    }

    static bugs = {
        olivia: new Bug('Olivia Orange', 'olivia'),
        ricky: new Bug('Ricky Red', 'ricky'),
        ella: new Bug('Ella Yellow', 'ella'),
        tommy: new Bug('Tommy Teal', 'tommy'),
    };


    drawCard = (deck) => (deck.pop());

    /**
     *
     * @param {Player} currentPlayer
     * @param {Card[]}deck
     *
     * todo Feels like a cop-out to pass currentPlayerIndex in to compute the next player; seems unnatural. Rethink.
     * @param currentPlayerIndex
     * @param players
     */
    resolveTurn(currentPlayer, deck, currentPlayerIndex, players) {
        const card = this.drawCard(deck);
        this.resolveCard(currentPlayer, card);

        const space = this.spaces[currentPlayer.currentSpace];

        //Handle Go Again on card or advance to next player
        let nextPlayerIndex = currentPlayerIndex;
        if (!card.goAgain) {
            nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
        }
        //todo handle case where a player is home. The player doesn't get more turns

        return new TurnResolution(currentPlayer, nextPlayerIndex, card, space);
    }

    resolveCard(player, card) {
        // move
        if (card.type === cardTypes.MOVE) {
            this.move(player, card.magnitude);

            //resolve landing
            this.resolveSpace(player);
        }

        // award aphids
        if (card.type === cardTypes.APHID) {
            player.adjustAphids(card.magnitude);
        }

        return {
            player: player,
            card: card
        };
    }

    /**
     *
     * @param {Player} player
     * @returns {Space}
     * @todo Add hooks for passThru (ants), endedOn (shortCut) , landedOn (mantis)
     * @todo maybe move these increment things to 'endOn' just to keep everything consistent
     * @todo Need a way to trigger some kind of messages
     */
    resolveSpace( player) {
        /** {Space} */
        let currentSpace = this.spaces[player.currentSpace];
        if (currentSpace.grantsMantisPass) {
            player.passes++;
        }

        if (currentSpace.aphidChange) {
            player.adjustAphids(currentSpace.aphidChange);
        }

        return currentSpace;
    }

    /**
     * @param {Player} player
     * @param magnitude
     * @returns {*}
     */
    move(player, magnitude) {
        let currentSpace = player.currentSpace;
        let movingForward = magnitude > 0;
        for (let i=0; i < Math.abs(magnitude); i++) {
            currentSpace =
                movingForward && //we're moving in a positive direction
                this.spaces[currentSpace].forward //And .forward is set (which is true for every space except the Home space
                    ? this.spaces[currentSpace].forward :
                    this.spaces[currentSpace].back;

            player.currentSpace = currentSpace;

            //Run all of the functions registered as 'landOn' for the space
            if (this.spaces[player.currentSpace].landOn.length) {
                this.spaces[player.currentSpace].landOn.forEach((landOnFunction) => { landOnFunction(player) }) ;
            }
        }

        //Run all of the function registered as 'endOn' for the space
        if (this.spaces[player.currentSpace].endOn) {
            this.spaces[player.currentSpace].endOn(player);
        }
    }
}

const cards = [];
//backwards
cards.push(...(new Card(cardTypes.MOVE, -1).replicate(1)));
cards.push(...(new Card(cardTypes.MOVE, -2).replicate(1)));
cards.push(...(new Card(cardTypes.MOVE, -3).replicate(1)));
//forward
cards.push(...(new Card(cardTypes.MOVE, 1).replicate(4)));
cards.push(...(new Card(cardTypes.MOVE, 2).replicate(4)));
cards.push(...(new Card(cardTypes.MOVE, 3).replicate(4)));
cards.push(...(new Card(cardTypes.MOVE, 4).replicate(3)));
cards.push(...(new Card(cardTypes.MOVE, 5).replicate(2)));
cards.push(...(new Card(cardTypes.MOVE, 6).replicate(2)));

//forward and go again
cards.push(...(new Card(cardTypes.MOVE, 2, true).replicate(4)));
cards.push(...(new Card(cardTypes.MOVE, 3, true).replicate(3)));
cards.push(...(new Card(cardTypes.MOVE, 4, true).replicate(2)));

//backwards and go again
cards.push(...(new Card(cardTypes.MOVE, -4, true).replicate(2)));

//Add aphids
cards.push(...(new Card(cardTypes.APHID, 1).replicate(1)));
cards.push(...(new Card(cardTypes.APHID, 2).replicate(1)));
cards.push(...(new Card(cardTypes.APHID, 3).replicate(2)));
cards.push(...(new Card(cardTypes.APHID, 3).replicate(1)));
//
// //loose aphids
cards.push(...(new Card(cardTypes.APHID, -1).replicate(1)));
cards.push(...(new Card(cardTypes.APHID, -2).replicate(1)));

/**
 *
 * @param array[]
 */
const shuffle = (array) => {
    // return;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

export const pluralize = (word, count) => (`${count} ${word}${Math.abs(count) !== 1 ? 's' : ''}`);

export {cards, shuffle}
export const engine = new Engine(generateStandardSpaces);
