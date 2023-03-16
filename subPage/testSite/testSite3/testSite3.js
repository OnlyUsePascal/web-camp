// toggle display
function toggleDisplay(eleId) {
    var ele = document.getElementById(eleId);
    ele.style.display = ele.style.display === 'none' ? 'block' : 'none';
}

function toggleContent(inputId, divId) {
    var inputEle = document.getElementById(inputId);
    var divEle = document.getElementById(divId);
    divEle.innerHTML = inputEle.value;
}

// querySelectorAll
function toggleQuery(inputId, eleSelector) {
    var index = document.getElementById(inputId).value;
    var eleList = document.querySelectorAll(eleSelector);

    //validate
    if (index >= eleList.length || index < 0) alert("input another index pls");

    //reset all list
    for (let i = 0; i < eleList.length; i++) {
        // console.log(eleList[i]);
        eleList[i].style.fontWeight = "";
    }

    //highlight selected index
    eleList[index].style.fontWeight = "900";

    // weird thing
    // font weight is changed before loop finished -> maybe the list element is synced after change
    // for in loop iterate more than <length> elements
}

// toggle
function toggleDiv(eleId) {
    var ele = document.querySelector(eleId);
    ele.classList.toggle("big-font");
}


// change innter content
function changeHTML(eleId) {
    var ele = document.querySelector(eleId);
    ele.innerHTML = "<b>Some bold text</b>";
}

function changeText(eleId) {
    var ele = document.querySelector(eleId);
    ele.textContent = "<b>Some another text</b>";
}

// eventListener
document.querySelector("#testLisener").addEventListener("click", function() {
    alert('get ricked rolled');
});

// High order function
function getPlus(num1, num2) {
    console.log(num1 + num2);
}

function getMul(num1, num2) {
    console.log(num1 * num2);
}

function calc(num1, num2, func) {
    func(num1, num2);
}

function actionCall(num1, num2, func) {
    var n1 = parseInt(document.querySelector(num1).value),
        n2 = parseInt(document.querySelector(num2).value);

    calc(n1, n2, window[func]);
    //or window[func](n1,n2);
}

// js object
function Person(_age, _height){
    this.age = _age;
    this.height = _height;
    this.printInfo = () => {
        alert("age is " + this.age + ", height is " + this.height);
    }
}

function submitPerson(ageId, heightId){
    var age = parseInt(document.querySelector(ageId).value),
        height = parseFloat(document.querySelector(heightId).value);
    
    var person = new Person(age, height);
    person.printInfo();
}

// playing sound
document.querySelectorAll(".soundBtn").forEach(ele => {
    // console.log(ele.textContent);
    var soundUrl = './' + ele.textContent + '.mp3';
    console.log(soundUrl);

    ele.addEventListener('click', () => {
        new Audio(soundUrl).play();

    });
});