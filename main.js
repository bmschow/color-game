var gameLevel = "hard";
var winner;
var box1;
var box2;
var box3;
var box4;
var box5;
var box6;

function Box(id) {
    this.obj = document.getElementById(id);
    this.colorList = getRandomColorList();
    this.obj.style.backgroundColor = getColorString(this.colorList); 
    this.setWinner = function(isWinner) {
        if(isWinner) {
            this.obj.addEventListener('click', win);
        } else {
            this.obj.addEventListener('click', fade);
        }
    }
    this.winner = false;
}

function win() {
    alert("Winning");
}

function fade(element) {
    var op = 1; //inital opacity
    var timer = setInterval(function () {
        if(op <= 0.1) {
            clearInterval(timer);
        }
        element.target.style.opacity = op;
        element.target.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function setUp() {

    box1 = new Box("box1");
    box2 = new Box("box2");
    box3 = new Box("box3");
    if (gameLevel === "hard") {
        box4 = new Box("box4");
        box5 = new Box("box5");
        box6 = new Box("box6");
        winner = selectWinner([box1, box2, box3, box4, box5, box6]);
    } else {
        winner = selectWinner([box1, box2, box3]);
    }
    document.getElementById("goalColor").textContent = getColorString(winner.colorList);
    
}

function selectWinner(boxes) {
    winnerInd = Math.floor(Math.random() * (boxes.length));
    console.log("winner = " + winnerInd);
    for (var i = 0; i < boxes.length; i ++) {
        if(i === winnerInd)  {
            boxes[i].setWinner(true);
        } else {
            boxes[i].setWinner(false);
        }
    }
    return boxes[winnerInd]; 
}

function setHeadingColors(colorList) {
    var jumbo = document.querySelector('#jumbo');
    jumbo.style.backgroundColor = getColorString(colorList);
    var options = document.querySelectorAll('.options');

    for (var i = 0; i < options.length; i++) {
        options[i].style.color = getColorString(colorList);
    }
}

function getColorString(rgbColorList) {
    if (rgbColorList.length != 3) {
        throw "rgbColorList must be list of length 3";
    }
    var text = "rgb(" + rgbColorList[0] + ", " + rgbColorList[1] + ", " + rgbColorList[2] + ")";
    return text;
}

function getRandomColorList() {
    var colorList = [];

    for(var i = 0; i < 3; i++) {
        colorList[i] = Math.floor(Math.random() * 255);
    }

    return colorList;
}

if(window.addEventListener) {
    window.addEventListener('load', setUp, false);
} else {
    window.attachEvent('onload', setUp);
}

function setBackgroundColors() {
    
}