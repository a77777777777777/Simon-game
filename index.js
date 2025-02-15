var isStarted=false;
var level=0;
var count=0;
var sequence=[];
var colours=["green","red","yellow","blue"];

blurbuttons();
document.querySelector("body").addEventListener("keypress",function(){
    if(!isStarted){
        document.querySelector("h2").innerText= "Level "+level;
        isStarted=true;
        startSequence();
    }
});

for(var a=0;a<document.querySelectorAll("button.block").length;a++){
    document.querySelectorAll("button.block")[a].addEventListener("click", function(){
        if(isStarted){
            if(sequence[count]==this.id){
                playSound(count);
                highlight(count);
                if(count==level){
                    level++;
                    document.querySelector("h2").innerText= "Level "+level;
                    setTimeout(function(){
                        startSequence();
                    },1000);
                    count=0;
                }
                else count++;
            }
            else{
                document.querySelector("h2").innerText= "Game Over! Press a key to start";
                var sndfile=new Audio("sounds/wrong.mp3");
                sndfile.play();
                gameOver();
            }
        }
    });
}

function blurbuttons(){
    document.getElementById("1").blur();
    document.getElementById("2").blur();
    document.getElementById("3").blur();
    document.getElementById("4").blur();
}
function startSequence(){
        var rnd=Math.floor(Math.random()*4)+1;
        sequence.push(rnd);
        playSound((sequence.length-1));
        highlight((sequence.length-1));
}
function playSound(count){    
    var sndfile=new Audio("sounds/"+colours[sequence[count]-1]+".mp3");
    sndfile.play();
}
function highlight(count){ 
    document.getElementById(sequence[count]).classList.add("pressed");
    setTimeout(function(){
        document.getElementById(sequence[count]).classList.remove("pressed");
    },300);
}
function gameOver(){
    level=0;
    count=0;
    isStarted=false;
    sequence=[];
    blurbuttons();
}