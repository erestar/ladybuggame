export const cardTypes = {
    APHID: 'aphid',
    MOVE: 'move'
};

class Space {
    constructor(id, forward = null, back = null, aphidChange = 0, looseATurn = 0, mantisPass = 0 ) {
        this.id = id;
        this.forward = forward ? forward : id +1;
        this.back = back !== null ? back : id-1;
        this.grantsMantisPass = mantisPass;
        this.aphidChange = aphidChange;
    }

    passThru = null;

    landOn = null;

    endOn = null;
}

class Card {
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

export const olivia = new Bug('Olivia Orange', 'olivia');
export const ricky = new Bug('Ricky Red', 'ricky');
export const ella = new Bug('Ella Yellow', 'ella');
export const tommy = new Bug('Tommy Teal', 'tommy');

export class Player {
    /**
     * @param name
     * @param {Bug} bug
     */
    constructor(name = null, bug= null) {
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
    spaces.push(new Space(1, null, null, 0, 0, 1));
    spaces.push(new Space(2));
    spaces.push(new Space(3,null,null,3));
    spaces.push(new Space(4,null,null,0,0,1));
    spaces.push(new Space(5));

    const shortcutSpace = new Space(6);
    shortcutSpace.endOn = (/**Player*/ player) => {
        player.currentSpace = 13; //todo this is only coincidentally working, since it's just a cooincidence that the ids line up with the array indexes
    };
    spaces.push(shortcutSpace);

    spaces.push(new Space(7));
    spaces.push(new Space(8));

    const mantisSpace = new Space(9);
    mantisSpace.landOn = (/** Player */ player) => {
        //This should only get evaluated as soon as we hit the space. So you need to have a pass when you get here, not when you leave it.

        //We have a pass. Take it and leave you alone
        if (player.passes > 0) {
            player.passes--;
            return;
        }

        //Back to the start. That's OK, that's part of the fun.
        player.currentSpace = 0;
    };
    spaces.push(mantisSpace);

    spaces.push(new Space(10));
    spaces.push(new Space(11));
    spaces.push(new Space(12));
    spaces.push(new Space(13, null, null, 2));
    spaces.push(new Space(14));
    spaces.push(new Space(15, null, null, 5));
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
    spaces.push(new Space(41));

    return spaces;
}

// class turnResolution {
//     constructor(actingPlayer, nextPlayer, card, space) {
//     }
//
// }


class Engine {
    constructor(spaceGenerator) {
        this.currentPlayerIndex = null;

        /**
         *
         * @type {Space[]}
         */
        this.spaces = spaceGenerator();
    }

    drawCard = (deck) => (deck.pop());

    /**
     *
     * @param {Player} currentPlayer
     * @param {Card[]}deck
     */
    resolveTurn(currentPlayer, deck) {
        const card = this.drawCard(deck);
        return this.resolveCard(currentPlayer, card);
    }

    resolveCard(player, card) {
        // move
        if (card.type === cardTypes.MOVE) {
            this.move(player, card.magnitude);
            //todo We're going to need to do the passThru and landedOn checks here to see if we run into an obstacle

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
     * //todo Add hooks for passThru (ants), endedOn (shortCut) , landedOn (mantis)
     */
    resolveSpace( player) {
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
     *
     * @param {Player} player
     * @param magnitude
     * @returns {*}
     */
    move(player, magnitude) {
        let currentSpace = player.currentSpace;
        let movingForward = magnitude > 0;
        for (let i=0; i < Math.abs(magnitude); i++) {
            currentSpace = movingForward ? this.spaces[currentSpace].forward : this.spaces[currentSpace].back;
            player.currentSpace = currentSpace;

            if (this.spaces[player.currentSpace].landOn) {
                this.spaces[player.currentSpace].landOn(player);
            }
        }

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
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

export { cards, shuffle }
export const engine = new Engine(generateStandardSpaces);