const gameboard = document.querySelector("#gameboard")

//used to represent an empty space on the board
const dark = '<div class="piece" id="dark"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z\"/></svg></div>'

/*
// Retrieve the height and width of the board from sessionStorage
const storedHeight = sessionStorage.getItem("inputHeight");
const storedWidth = sessionStorage.getItem("inputWidth");

// Applies the given height and weight to the create the size of the board
document.getElementById("gameboard").style.height = (storedHeight * 40) + "px";
document.getElementById("gameboard").style.width = (storedWidth * 40) + "px";
*/
document.getElementById("gameboard").style.height = (5 * 60) + "px";
document.getElementById("gameboard").style.width = (6 * 60) + "px";

const startPieces = []

function populateBoard() {
    for(let i = 0; i < 6 * 5; i++)
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

        // if(i % 2 == 0)
        // {
        //     square.classList.add('blue')
        // } else {
        //     square.classList.add('red')
        // }

        gameboard.append(square);
    })
}

populateBoard();
createBoard();
