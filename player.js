class Player {
    constructor(p_id) {
        this.p_id = p_id;

        this.hand = [];
        this.mini_deck = [];
    }

    showHand() {
        for (var i = 0; i < this.hand.length; i++) {
            this.hand[i].hideShow();
        }
    }

    positionMinideck() {
        var step = 7 - 2 * (this.mini_deck.length - 5);
        var x_pos = inRange(0,10,1);
        for (var i = 0; i < this.mini_deck.length; i++) {
            this.mini_deck[i].moveCard(100, 700 - 600 * this.p_id);
        }
    }

}