var playerOneScore = 0;
var playerTwoScore = 0;
var speed = 10;
var isGameStarted = false;
var t = document.getElementById('top-handle');
var b = document.getElementById('bottom-handle');
var ball = document.getElementById('ball');
var w = window.innerWidth;
var h = window.innerHeight;

window.onload = function(){
    if(localStorage.player === undefined){
         alert("this is your first time");
         this.localStorage.setItem("score", "0");
    }
    else{
        alert(localStorage.player + " has a maximum score of " + localStorage.score);
    }
    updateHandles();
}

window.addEventListener("resize", updateHandles);
function updateHandles(){
    w = window.innerWidth;
    h = window.innerHeight;
    speed = Math.floor(w/25);
    t.style.width = "200px";
    t.style.left = (w/2 - 100) + "px";
    b.style.width = "200px";
    b.style.left = (w/2 - 100) + "px";
    ball.style.width = "20px";
    ball.style.left = (w/2 - 10) + "px";
    ball.style.top = h - 44 + "px";
}

window.addEventListener("keydown", onKeyDown, true);
function onKeyDown(event){
    console.log(event.keyCode);
    if(event.keyCode == 13 && isGameStarted == false){
        //start game
        startGame();
        isGameStarted = true;
    }
    if(isGameStarted){
	    if(event.keyCode ==65 || event.keyCode == 37 ){
       		moveHandlesLeft();
    	}
    	else if(event.keyCode == 68 || event.keyCode == 39){
         	moveHandlesRight();	  
    	}
    }
}


function moveHandlesLeft(){
    console.log("move handles to left " + t.style.left);
    let left = formatVal(t.style.left);
    if(left - speed > 0){
        t.style.left = left - speed + "px";
        b.style.left = left - speed + "px";
    }
    else if(left > 0){
        t.style.left = "0px";
        b.style.left = "0px";
    }
}

function moveHandlesRight(){
    console.log("move handles to right " + t.style.left); 
    let left = formatVal(t.style.left);
    if(left + speed < w - 200){
        t.style.left = left + speed + "px";
        b.style.left = left + speed + "px";
    }
    else if(left < w - 200){
        t.style.left = left + (w - 200 - left) + "px";
        b.style.left = left + (w - 200 - left) + "px";
    }
}

var speedX = 2;
var speedY = -3;
var ballSpeed = 10;

function updateBallPos(){
    ball.style.left = formatVal(ball.style.left) + speedX + "px";
    ball.style.top = formatVal(ball.style.top) + speedY + "px";
}

function moveBall(){
    updateBallPos();
    let top = formatVal(ball.style.top);
    if(top < 10 || top > h-24){
        clearInterval(interval);
        endGame();
    }
    else{
        if(top <= 24 && 
            formatVal(ball.style.left) > formatVal(t.style.left) &&
            formatVal(ball.style.left) < formatVal(t.style.left) + 200){
                speedY *= -1;
                playerOneScore++;
        }
        if(top >= h-44 &&
            formatVal(ball.style.left) > formatVal(b.style.left) &&
            formatVal(ball.style.left) < formatVal(b.style.left) + 200){
                speedY *= -1;
                playerTwoScore++;
        }
    }

    let left = formatVal(ball.style.left);
    if(left <= 5 || left >= w - 25){
        speedX *= -1;
    }
}

function startGame(){
    document.getElementById("info").style.display = "none";
    interval = setInterval(function(){
        moveBall();
    }, ballSpeed)
}

function endGame(){
    isGameStarted = false;
    localStorage.setItem("score", Math.max(playerOneScore, playerTwoScore, localStorage.getItem("score")));
    if(playerOneScore > playerTwoScore){
        alert("Player 1 wins with a score of " + playerOneScore + ". Max score is " + localStorage.getItem("score"))        
    }
    else if(playerTwoScore > playerOneScore){
        alert("Player 2 wins with a score of " + playerTwoScore + ". Max score is " + localStorage.getItem("score"))
    }
    else{
        alert("Draw with a score of " + playerOneScore + ". Max score is " + localStorage.getItem("score"));
    }
    if(localStorage.getItem("player") === undefined || (Math.max(playerOneScore, playerTwoScore) > localStorage.getItem("score"))){
        if(playerOneScore > playerTwoScore){
            localStorage.setItem("player", "Player 1");
        }
        else{
            localStorage.setItem("player", "Player 2");
        }
        // localStorage.setItem("score", Math.max(playerOneScore, playerTwoScore));
    }
    resetGame();
}

function resetGame(){
    playerOneScore = 0;
    playerTwoScore = 0;
    var speedX = 2;
	var speedY = -3;
    updateHandles();
    document.getElementById("info").style.display = "block";
}

function formatVal(val){
    return Number(val.replace("px", ""));
}