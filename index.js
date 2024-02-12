const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;


// Create an array to hold the Audio objects
const audioArray = [];
// Load each audio file into the array
for (let i = 1; i <= 8; i++) {
    const audio = new Audio(`./audio/audio${i}.mp3`);
    audioArray.push(audio);
}

const winnningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// now we will create function to initialize the game
function initializeGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    // now after clicking on new game button it should initialize the game from start we...
    // have to execute the below function so that all boxes becomes unchecked like starting.
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";

        // if someone wins then green color of boxes should be removed so we will initialize..
        //  again css property of each box
        box.classList= `box box${index+1}`;

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initializeGame();
function swapTurn(){
    if (currentPlayer==="X") {
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if (gameGrid[index]==="") {
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;

        // if a box is clicked then it should not show cursor pointer
        boxes[index].style.pointerEvents="none";
        // once clicked then its turn to 2nd player to click so we are calling the function
        swapTurn();

        // check for game over
        checkGameOver();
    }
    audioArray[index].play();
}

function checkGameOver(){
    let answer="";

    // all 3 boxes should  be non-empty and exactly same in value
    winnningPositions.forEach((position)=>{
        if ((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]])) {
            // check if winner is x or o

            if (gameGrid[position[0]]==="X") {
                answer="X";
            }
            else{
                answer="O";
            }

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (answer!=="") {
        gameInfo.innerText= `Winner is ${answer} 🎉🎉`;
        // if someone wins then make all boxes unclickable
        boxes.forEach((box) => {
            box.style.pointerEvents="none";
        });
        return;
    }

    // game draw case.first count the box
    let fillcount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillcount++;
        }
    })

    // check whole boxes are full or not
    if(fillcount===9){
        gameInfo.innerText= "Match Draw !"
    }
    
}

boxes.forEach((box,index) => {
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initializeGame);

