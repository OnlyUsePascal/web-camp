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
function changeHTML(eleId){
    var ele = document.querySelector(eleId);
    ele.innerHTML = "<b>Some bold text</b>";
}

function changeText(eleId){
    var ele = document.querySelector(eleId);
    ele.textContent = "<b>Some another text</b>";
}

