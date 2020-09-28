var board;
const boardWidth = 800;
const boardHeight = 800;
var images = [];

var playerTurn = 0;

const nbr_of_player = 2;
const nbr_card_minideck = 5;
const nbr_card_hand = 10;

const margin = 25;
const cardWidth = 140;
const cardHeight = 190;
// const cardDim = createVector(140, 190);
const deckArea = [boardWidth - margin, boardHeight / 2];
const playArea = [boardWidth / 2, boardHeight / 2];

function setup() {
    createCanvas(boardWidth, boardHeight);

    for (var i = 0; i < 52 ; i++) {
        var nbr_in_value = (i % 13) + 1;
        var nbr_in_colour = floor(i / 13);
        var cardValue;
        var colour = ["Clubs", "Hearts", "Spades", "Diamonds"];

        switch (nbr_in_value) {
            case 1:
                cardValue = "A";
                break;
            case 11:
                cardValue = "J";
                break;
            case 12:
                cardValue = "Q";
                break;
            case 13:
                cardValue = "K";
                break;
            default:
                cardValue = nbr_in_value.toString();
        }

        images.push(
            loadImage("assets/card" + colour[nbr_in_colour] + cardValue + ".png")
        );
    }

    images.push(loadImage("assets/cardBack_green3.png"))

    board = new Board(nbr_of_player);
}

function draw() {
    background(100);
    board.show();

    push();
    rectMode(CENTER);
    stroke(255, 204, 0);
    noFill();
    rect(675, 400, 144, 194, 5);
    stroke(0, 204, 255);
    rect(400, 400, 144, 194, 5);
    pop();

    stroke(255);
    line(800/3,0,800/3,800);

    textSize(40);
    fill(255);
    text(playerTurn, 150 , 300);

    push();
    stroke(255, 255, 0);
    line(0, 10, margin,10);
    line(800 / 3, 10, 800 / 3 - margin,10);
    pop();

}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        playerTurn = (playerTurn + 1) % nbr_of_player;
        board.nextTurn();
    }
}

function mouseClicked() {
    var x = mouseX;
    var y = mouseY;

    if ((abs(x - 675) <= 140 / 2 && abs(y - 400) <= 190 / 2) && board.deckCard.length !== 0) {
        board.drawCard();
    }
    if (board.deckCard.length === 0 && board.playedCard.length > 1) {
        board.resetDeck();
    }

    // if (in hand) {
    //
    // } else if (in minideck) {
    //
    // }

    // if (false) {
    //     board.___.playCard[board.playedCard[board.playedCard.length - 1]];
    // }
}

function inRange(start, stop, step=1) {
    if (typeof stop == 'undefined') {
        stop = start;
        start = 0;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
}

// function mouseDragged() {
//     var x = mouseX;
//     var y = mouseY;
//
//     for (var i = 0; i < board.deckCard.length; i++) {
//         board.deckCard[i].move();
//     }
// }
