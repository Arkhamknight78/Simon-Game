var started=false;
var level=0;

$(document).keypress(function(event) {
    if(event.key=="a" && started==false){
    started=true;
    
    nextSequence();}
});


var userclickedPattern=[];
var gamePattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() 
{
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomchoosenColour = buttonColours[randomNumber];
    $("#"+randomchoosenColour).addClass("pressed");
    setTimeout(function(){
    $("#"+randomchoosenColour).removeClass("pressed");
    },100);
    gamePattern.push(randomchoosenColour);
    console.log(gamePattern);
   
}


$(".btn").click(function(event) {
    var UserChoosenColor = event.target.id;
    animatePress(UserChoosenColor);
    userclickedPattern.push(UserChoosenColor);
    console.log(userclickedPattern);
    var audio=new Audio("sounds/"+UserChoosenColor+".mp3");
    audio.play();
    checkAnswer(userclickedPattern.length-1);
});

var lengthgamePattern=gamePattern.length;
var lengthuserclickedPattern=userclickedPattern.length;

function checkAnswer(currentLevel){
  
    if(gamePattern[currentLevel]===userclickedPattern[currentLevel]){
        console.log("success");
        if(userclickedPattern.length===gamePattern.length){
            level++;
            setTimeout(function(){
                
                userclickedPattern=[];
                nextSequence();
            },1000);
        }
        
    }
    else{
        console.log("wrong");
        var adu2=new Audio("sounds/wrong.mp3");
        adu2.play();
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200);
        $('h1').text("Game over, Press any key to Restart");
        startover();
    }
}
function startover(){
    level=0;
    gamePattern=[];
    userclickedPattern=[];
    started=false;
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}