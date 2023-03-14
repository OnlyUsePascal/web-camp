$('#changeStyle').click(() => {
    var curColor = $('h2').css('backgroundColor');
    $('h2').css('backgroundColor', curColor === 'rgb(255, 0, 0)' ? 'white' : 'red');
})

// manipulation
// $('.changeStyle2').click((event) => {
//     console.log(event.target.textContent);
// })

//css
$('.changeStyle2').click(function () {
    var color = this.textContent;
    $('.sampleHeader').css('backgroundColor', color);
})

//add class
$('.changeStyle3').click(function () {
    var prop = this.id;
    $('.sampleHeader').toggleClass(prop);
})

//change inner
$('.changeStyle3').click(function () {
    var content = $('#maniInput').val();
    $('#innerTest').html(content);
});

// get attr
$('#getSource').click(function () {
    var src = $('#dogImg').attr('src');
    $('#imgSource').text(String(src));
})

// change attr
$('.changeUrl').click(function () {
    var url = 'https://' + this.textContent + '.com';
    $('#testUrl').attr('href', url);
});

// listener
var listenerStat = false;
$('#keyListener').click(function () {
    listenerStat = !listenerStat;

    if (listenerStat) {
        this.textContent = 'ON';
        $(document).keypress(function (button) {
            $('#testListener').val(button.key);
        })
    }
    else {
        this.textContent = 'OFF';
        $(document).off();
    }
})

$('#mouseOver').on('mouseover', function () {
    this.textContent = "Yo mama";
    this.style.fontSize = '50px';
})

$('#mouseOver').on('mouseout', function () {
    this.textContent = "Mouse over (for jquery rmb to use mouseout)";
    this.style.fontSize = '1rem';
})

// animation
function bigger(){
    $('#dogImg2').animate({width: '200px'});
}

function jumpAround(){
    $('#dogImg2').animate({left: '+=100'}).
                    animate({top: '+=100'}).
                    animate({left: '-=100'}).
                    animate({top: '-=100'});


}