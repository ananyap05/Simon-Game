var userClickedPattern=[];

var gamePattern=[];

var buttonColours=["red","blue","green","yellow"];

var level=0;

var started=false;

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("Success");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var colourAudio=new Audio("./sounds/"+name+".mp3");
  colourAudio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function startOver(){
  gamePattern=[];
  started=false;
  level=0;
}





