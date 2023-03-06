function matchDice(dice1, dice2) {
    if (dice1 === dice2) return;
    winner = (dice1 > dice2) ? 1 : 2;
    document.querySelector('h1').
        textContent = 'The winner is player ' + winner;
}

function randomGen() {
    var dice1 = Math.floor(Math.random() * 6 + 1);
    var dice2 = Math.floor(Math.random() * 6 + 1);

    document.querySelector('.img1').
        setAttribute('src', './images/dice' + dice1 + '.png');
    document.querySelector('.img2').
        setAttribute('src', './images/dice' + dice2 + '.png');

    matchDice(dice1, dice2);
}