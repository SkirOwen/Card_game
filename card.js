class Card{
    constructor(x, y, player_id, isShown, colour, cardValue, pic) {
        this.x = x;
        this.y = y;
        // this.cardTile = createVector(x * cardWidth + cardWidth / 2, y * cardHeight + cardHeight / 2);
        this.cardTile = [x - cardWidth / 2, y - cardHeight / 2, x + cardWidth / 2, y + cardWidth];
        this.pixelPosition = createVector(x + 140 / 2, y + 190 / 2);

        this.defaultHitBox = [this.x, this.y, cardWidth, cardHeight];
        this.cardHitBox = [];

        this.player_id = player_id;
        this.isShown = isShown;
        this.colour = colour;
        this.cardValue = cardValue;
        this.pic = pic;
        // this.movable = movable;
        this.movingThisCard = false;
        this.cardEffect = 0;
    }

    show() {
        if (this.isShown) {
            imageMode(CENTER);
            image(this.pic, this.x, this.y);
            push();
            rectMode(CENTER);
            fill(140, 0, 140, 25);
            rect(this.cardHitBox[0], this.cardHitBox[1], this.cardHitBox[2], this.cardHitBox[3]);
            pop();
            stroke(255, 0, 255);
            line(this.x - 140/2, this.y, this.x + 140/2, this.y);
        }
        else {
            imageMode(CENTER);
            image(images[52], this.x, this.y);
        }
    }

    shake() {

    }

    hideShow() {
        this.isShown = !this.isShown;
    }

    canMove() {
        return this.player_id == playerTurn;
    }

    move() {
        // if (!this.movable) {
        var dx = abs(mouseX - this.x);
        var dy = abs(mouseY - this.y);

        if (dx <= 140 / 2 && dy < 190 / 2) {
            this.x = mouseX;
            this.y = mouseY;
        }
    }

    moveCard(x, y) {
        this.x = x;
        this.y = y;
        this.cardHitBox = [this.x, this.y, cardWidth, cardHeight];
    }

    canPlay(played_card) {
        return (this.canMove() && (
                    (played_card.colour === this.colour)
                    || (played_card.cardValue === this.cardValue)
                    || (this.cardValue === 11)
                    || (played_card.cardValue === 5 && this.cardValue === 12)
                    || (played_card.cardValue === 12 && this.cardValue === 5)
                    )
                );
    }

    playCard(played_card) {

    }

    setHitBox(hitbox_type) {
        if ((hitbox_type === "default" || hitbox_type === "top" || hitbox_type === "minideck")) {
            this.cardHitBox = [this.x, this.y, cardWidth, cardHeight];
        } else if (hitbox_type === "hand") {
            this.cardHitBox = [this.x - (140 / 2) + 15, this.y, 30, 190];
        }
    }
}


class As extends Card {
    // block except 5-Q
}


class Two extends Card {
    // put a card down of mini deck
}


class Three extends Card {
    // nothing
}


class Four extends Card {
    // nothing
}


class Five extends Card {
    // with Queen
}


class Six extends Card {
    //nothing
}


class Seven extends Card {
    // play again
}


class Eight extends Card {
    // play again
}


class Nine extends Card {
    // nothing
}


class Ten extends Card {
    // switch mini deck cards
}


class Jack extends Card {
    // change colour
}


class Queen extends Card {
    // with five
}


class King extends Card {
    // play again
}



