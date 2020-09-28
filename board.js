class Board {
    constructor(nbr_of_player) {
        // this.blueCard = [];
        // this.redCard = [];
        this.deckCard = [];
        this.playedCard = [];
        // TODO: n player variant
        this.nbr_of_player = nbr_of_player;
        this.players = [];
        this.setupCards();
        this.createPlayers();
        this.setupPlayers();
    }

    setupCards() {
        var colour = ["Clubs", "Hearts", "Spades", "Diamonds"];
        for (var i = 0; i < 52; i++) {
            var nbr_in_colour = floor(i / 13);
            this.deckCard.push(
                new Card(
                        675,
                        400,
                        "deck",
                        false,
                        colour[nbr_in_colour],
                        ((i % 13) + 1),
                        images[i],
                    )
                );
        }
        this.shuffleDeck();
    }

    createPlayers() {
        for (var i = 0; i < this.nbr_of_player; i++) {
            this.players.push(new Player(i));
        }
    }

    setupPlayers() {
        var card_in_minidecks = nbr_card_minideck * this.nbr_of_player;
        var card_in_hands = nbr_card_hand * this.nbr_of_player;
        var card_to_deal = card_in_minidecks + card_in_hands + 1;
        var p_id;

        for (var i = 0; i < card_to_deal; i++) {

            p_id = i % this.nbr_of_player;
            var card = this.deckCard.pop();
            card.player_id = p_id.toString();

            if (i < card_in_minidecks) {                            // MINIDECK
                card.moveCard((100 + 7 * (i - p_id)), (700 - 600 * p_id));
                if (i >= card_in_minidecks - this.nbr_of_player) {
                    card.hideShow();
                    card.setHitBox("minideck");
                }
                this.players[p_id].mini_deck.push(card);

            } else if (i < card_in_hands + card_in_minidecks) {     // HAND
                card.moveCard((225 + 15 * (i - p_id)), (700 - 600 * p_id));
                if (i < (card_in_hands + card_in_minidecks) - 2) {
                    card.setHitBox("hand");
                } else {
                    card.setHitBox("top")
                }
                if (p_id === 0) {
                    card.hideShow();
                }
                this.players[p_id].hand.push(card);
            } else {                                                //PLAYED_DECK
                card.hideShow();
                card.moveCard(playArea[0], playArea[1]);
                this.playedCard.push(card);
            }
        }
    }

    shuffleDeck() {
        this.deckCard = shuffle(this.deckCard);
    }

    // TODO: fct moveCardPLACE = PLACE.push() then moveCard
    resetDeck() {
        var new_card = [this.playedCard.pop()];
        var len = this.playedCard.length;

        for (var i = 0; i < len; i++) {
            var c = this.playedCard.pop();
            this.deckCard.push(c);
            this.deckCard[i].moveCard(675, 400);
            this.deckCard[i].hideShow();
            // this.deckCard[i].show();

            console.log(c);
            console.log(new_card);
        }
        console.log("AHAHA");

        this.shuffleDeck();
        this.playedCard.push(new_card.pop());
    }

    nextTurn() {
        for (var p = 0; p < this.nbr_of_player; p++) {
            this.players[p].showHand();
        }
    }

    drawCard() {
        var drawn_card = this.deckCard.pop();
        var hand_length = this.players[playerTurn].hand.length;
        drawn_card.moveCard((500 + 17.5 * (hand_length - playerTurn)), (700 - 600 * playerTurn));
        drawn_card.hideShow();
        this.players[playerTurn].hand[this.players[playerTurn].hand.length - 1].setHitBox("hand");
        this.players[playerTurn].hand.push(drawn_card);
    }
    /*  pseudo code
    playCard(area) {
        var last_card_played = board.playedCard[board.playedCard.length - 1];
        // Suppose I know the card
        if (card.canPlay(last_card_played)) {
            card.moveCardToArea(played_card);
            this.applyEffect(card.cardEffect);

        }
    }

    applyEffect(cardEffect) {
        this.nextTurn();
    }
    */

    moveCardToArea(card, area, p_id) {
        switch (area) {
            case "deck":
                card.moveCard(deckArea[0], deckArea[1]);
                break;
            case "hand":
                var handCoor = this.getHandCoor(p_id);
                card.moveCard(handCoor[0], handCoor[1]);
                break;
            case "minideck":
                var minideckCoor = this.getMinideckCoor(p_id)
                card.moveCard(minideckCoor[0], minideckCoor[1]);
                break;
            case "played_card":
                card.moveCard(playArea[0], playArea[1]);
                break;
        }
    }

    getHandCoor(p_id) {
        // if overflow form margin
    }

    getMinideckCoor(p_id) {

    }

    show() {
        for (var i = 0; i < this.deckCard.length; i++) {
            this.deckCard[i].show();
        }
        for (var i = 0; i < this.playedCard.length; i++) {
            this.playedCard[i].show();
        }
        for (var p = 0; p < this.nbr_of_player; p++) {
            var minideck_len = this.players[p].mini_deck.length;
            var hand_len = this.players[p].hand.length;

            for (var i = 0; i < minideck_len; i++) {
                this.players[p].mini_deck[i].show();
            }
            for (var i = 0; i < hand_len; i++) {
                this.players[p].hand[i].show();
            }
        }
    }
}