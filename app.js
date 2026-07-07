let boxes = document.querySelectorAll(".box");
let winnerContainer = document.querySelector(".winner-container");
let msgContainer = document.querySelector(".msg-container");
let newBtn = document.querySelector("#new-btn");
let resetBtn = document.querySelector("#reset-btn");
let winnerName = document.querySelector("#winner-name");

let turnO = true;
let count = 0; 

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const resetGame = () => {
    turnO =true;
    count = 0;
    enableBoxes();
    winnerContainer.classList.add("hide");
    newBtn.classList.add("hide");
    resetBtn.classList.remove("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // player0
        if (turnO === true) {
            box.innerText = "O";
            turnO = false;
        } 
        // playerX
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        count++;
        checkWinner();
    });

});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    winnerName.innerText = `Winner: ${winner}`;

    document.querySelector(".trophy").style.display = "block";
    document.querySelector("#congrats").style.display = "block";

    winnerContainer.classList.remove("hide");
    newBtn.classList.remove("hide");
    resetBtn.classList.add("hide");

    disableBoxes();
};

const checkWinner = () => {

    let winnerFound = false;

    for (let pattern of winPatterns) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {

            if (pos1Val === pos2Val && pos2Val === pos3Val) {

                winnerFound = true;
                showWinner(pos1Val);
                return;
            }
        }
    }

    if (!winnerFound && count === 9) {
        showDraw();
    }
};


const showDraw = () => {
    winnerName.innerText = "It's a Draw!";

    // Hide elements you don't want
    document.querySelector(".trophy").style.display = "none";
    document.querySelector("#congrats").style.display = "none";

    winnerContainer.classList.remove("hide");
    newBtn.classList.remove("hide");
    resetBtn.classList.add("hide");

    disableBoxes();
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);