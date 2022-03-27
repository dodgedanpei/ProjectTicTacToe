const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

var gameOver = false;

var counter = 0;

var players = {
  player1:[],
  player2:[]
}

var displayController = {
  player1:true,
  player2:false
}

var xPlayerName = '';
var oPlayerName = '';

//Selectors
const container  = document.getElementById("main-container");
const resetBtn = document.querySelector(".reset");
const allGrids = document.querySelectorAll(".grid");
const gameStatus = document.getElementById("gameStatus");
const gameInfoForm = document.querySelector('.gameInfo')
const gameInfoSubmit = document.querySelector('.gameInfoSubmit');
const xName = document.getElementById('xName');
const oName = document.getElementById('oName');

//Event Listeners
container.addEventListener('click',function(e){
  const target = e.target;
  if(gameOver == false){
  if(displayController.player1 == true){
      if(target.innerHTML == ''){
        target.innerHTML ="X";
        target.classList.add('X')
        changePlayer();
        updateStatus();
        check(players.player1);
        counter++;
        checkDraw();
      }
  } else{
      if(target.innerHTML ==''){
        target.innerHTML ="O";
        target.classList.add('O')
        changePlayer();
        updateStatus();
        check(players.player2);
        counter++;
        checkDraw();
      }
  }}

})

resetBtn.addEventListener('click',function(e){
  allGridsArray = Array.from(allGrids);
  allGridsArray.forEach(element => element.innerHTML="")
  allGridsArray.forEach(element => element.classList="grid")
  resetGame();
  displayController.player1 = true;
})

gameInfoSubmit.addEventListener('click', function(e){
  e.preventDefault();
  xPlayerName = xName.value;
  oPlayerName = oName.value;
  gameInfoForm.classList.add('none')
})

//Functions
function changePlayer() {
  if(displayController.player1==true){
    displayController.player1=false;
    displayController.player2=true;
  } else{
    displayController.player1=true;
    displayController.player2=false;
  }
}

function resetGame(){
counter = 0;
gameOver = false;
gameStatus.innerHTML = "In Play!"
gameInfoForm.classList.remove('none')
}

function check(player){
    for(let i=0; i < winningConditions.length; i++){
        if(allGrids[winningConditions[i][0]].className == allGrids[winningConditions[i][1]].className && allGrids[winningConditions[i][1]].className== allGrids[winningConditions[i][2]].className){
            if(allGrids[winningConditions[i][0]].innerHTML != '' && allGrids[winningConditions[i][1]].innerHTML != '' &&  allGrids[winningConditions[i][2]].innerHTML != '')
            {
                gameOver = true;
                if(displayController.player1 != true){
                    gameStatus.innerHTML = `${xPlayerName} Wins!`
                } else {
                    gameStatus.innerHTML = `${oPlayerName} Wins!`
                }
            }
        }
    }
}


function checkDraw(){
    if(counter == 9 && gameOver == false){
        gameStatus.innerHTML = "Draw!"
        gameOver = true;
    }
}

function updateStatus(){
  if(displayController.player1==true){
    gameStatus.innerHTML = `${xPlayerName}'s turn`
  } else{
    gameStatus.innerHTML = `${oPlayerName}'s turn`  }
}