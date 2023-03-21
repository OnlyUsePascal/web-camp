//flash
function flashUser(color) {
    var speed = 100
    playSound(color)

    $('#' + color).toggleClass('pressed')

    setTimeout(function () {
        $('#' + color).toggleClass('pressed')
    }, speed)
}


function flashGame(color) {
    var speed = 200
    playSound(color)
    $('#' + color).fadeOut(speed).fadeIn(speed)
}


//audio
function playSound(color) {
    new Audio('./sounds/' + color + '.mp3').play()
}


//
var buttonColors = ['red', 'blue', 'green', 'yellow']
var gamePattern = []
var userPattern = []
var level


//random gen
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber]

    //push to list
    gamePattern.push(randomChosenColor)

    //flash button 
    flashGame(randomChosenColor)
    playSound(randomChosenColor)

    //increase level
    level++
    $('#level-title').text('Level ' + level)

    // console.log('game pattern ' + gamePattern)

}


// check answer
function checkAnswer() {
    var index = userPattern.length - 1
    var userColor = userPattern[index]
    var gameColor = gamePattern[index]

    // console.log(userColor + ' -- ' + gameColor)

    if (userColor === gameColor) {
        //check if reach the last pattern
        if (index === gamePattern.length - 1) {
            $('#level-title').text('nice')

            userPattern = []
            setTimeout(() => nextSequence(), 1000)
        }
    }
    else {
        gameOver();
    }
}


//game
function gameStart() {
    gameStat = 1
    level = 0
    userPattern = []
    gamePattern = []


    nextSequence()

    //click listener
    $('.btn').on('click', function () {
        var userChosenColor = this.id

        flashUser(userChosenColor)

        userPattern.push(userChosenColor)
        console.log('user patern ' + userPattern)

        checkAnswer()
    })
}


function gameOver() {
    gameStat = 2

    $('#level-title').text('Bro u failed, press any key')

    // fail effect
    $('body').toggleClass('game-over')
    setTimeout(() => $('body').toggleClass('game-over'), 300)
    new Audio('./sounds/wrong.mp3').play()
    $('.btn').off()
}


//0 1 2: init start gameover
var gameStat = 0; 
$(document).keypress(function (button) {
    if (gameStat == 0) {
        if (button.key === 'a')
            gameStart();
    }
    else if (gameStat == 2) {
        gameStart();
    }
})
