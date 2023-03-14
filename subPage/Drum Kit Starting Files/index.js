var keyToSound = new Object();
keyToSound = {};

document.querySelectorAll('.drum').forEach(ele => {
    // get img url + map to key
    var img = getComputedStyle(ele).backgroundImage.split('/')[6].slice(0, -6);
    var audioUrl = './sounds/' + img + '.mp3';

    keyToSound[ele.textContent] = audioUrl;

    //event listener for click
    ele.addEventListener('click', () => {
        console.log(ele.textContent);

        // play audio
        playAudio(audioUrl);

        // play animation
        playAnimation(ele.textContent);

    });
});

// listener for key
document.addEventListener('keydown', button => {
    console.log(button.key);

    //validation
    if (keyToSound[button.key] === undefined) return;
    console.log(button.key);

    // play audio
    playAudio(keyToSound[button.key]);

    // add animation
    playAnimation(button.key);

});

function playAudio(audioUrl){
    new Audio(audioUrl).play();
}

function playAnimation(key){
    var ele = document.querySelector('.' + key);
    ele.classList.toggle('pressed');
    
    setTimeout(() => ele.classList.toggle('pressed'), 100);
}
