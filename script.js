let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","green","blue"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        started = true;

        levelup();
    }
});

function randflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randno = Math.floor(Math.random()*4);
    let randco = btns[randno];
    let randcolor = document.querySelector(`.${randco}`); //ish class color ka button access
    console.log(randno);
    console.log(randco);
    console.log(randcolor);
    gameSeq.push(randco);
    randflash(randcolor);
    // playSound(randco);
}

let maxi = 0;

function checkans(idx){
    if(userSeq[idx]===gameSeq[idx]){
        playSound(userSeq[idx]);
        if(userSeq.length===gameSeq.length){
            setTimeout(levelup,1000);
        }
    }else{
        if(level > maxi) {
            maxi = level;
        }
        h2.innerHTML = `Game Over! Your Score is <b>${level}</b> <br>High Score: <b>${maxi} <br> press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "aquamarine";
        },150);
        playSound("wrong");
        reset();
    }
}


function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}


function btnpress(){
    let btn = this;
    userflash(btn);
    
    usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    // playSound(usercolor);
    checkans(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".box");
for(btn of allbtns){
    btn.addEventListener("click",btnpress)
}

//play sound
function playSound(color) {
    let audio = new Audio(`${color}.mp3`);
    audio.play();
}
