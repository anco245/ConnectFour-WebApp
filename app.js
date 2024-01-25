const gameboard = document.querySelector("#gameboard")

// Retrieve the height and width of the board from sessionStorage
var storedHeight = sessionStorage.getItem("inputHeight");
var storedWidth = sessionStorage.getItem("inputWidth");

// Applies the given height and weight to the create the size of the board
document.getElementById("gameboard").style.height = (storedHeight * 40) + "px";
document.getElementById("gameboard").style.width = (storedWidth * 40) + "px";

const startPieces = []

function populateBoard() {
    for(let i = 0; i < storedHeight * storedWidth; i++)
    {
        startPieces.push(dark)
    }
}

function createBoard () {
    startPieces.forEach((startPieces, i) => {
        const square = document.createElement('div')

        square.classList.add('square')
        square.innerHTML = startPieces;

        square.setAttribute('square-id', i)

        gameboard.append(square);
    })
}

populateBoard();
createBoard();
