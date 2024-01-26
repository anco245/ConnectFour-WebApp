const gameboard = document.querySelector("#gameboard")

//graphic to represent an empty space on the board
const empty = '<div class="piece"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z\"/></svg></div>'

// Retrieve the height and width of the board from sessionStorage
const storedHeight = sessionStorage.getItem("inputHeight");
const storedWidth = sessionStorage.getItem("inputWidth");

// Applies the given height and weight to the create the size of the board
document.getElementById("gameboard").style.height = (storedHeight * 60) + "px";
document.getElementById("gameboard").style.width = (storedWidth * 60) + "px";

const storedPlayer1Color = sessionStorage.getItem("inputPlayer1Color");
const storedPlayer2Color = sessionStorage.getItem("inputPlayer2Color");

const startPieces = []

let turn = 0


function populateBoard() {
    for(let i = 0; i < storedHeight * storedWidth; i++)
    {
        startPieces.push(empty)
    }
}

function createBoard () {
    startPieces.forEach((startPieces, i) => {
        const square = document.createElement('div')

        square.classList.add('square')
        square.innerHTML = startPieces;

        square.setAttribute('square-id', i)

        //make a specific piece red or yellow
        // if(i == 1)
        // {
        //     square.firstChild.classList.add('red')
        // } else if (i == 2) {
        //     square.firstChild.classList.add('yellow')
        // }

        gameboard.append(square);
    })
}

function insert (col) {

    col = col-1;

    let playerColor;

    //player
    if (turn%2==0)
    {
        playerColor = storedPlayer1Color;
    } else {
        playerColor = storedPlayer2Color;
    }

    for(let i = (storedHeight * storedWidth) - storedWidth + col; i > 0; i-=storedWidth)
    {
        var square = document.querySelector('div[square-id="' + i + '"]');

        if(!(square.firstChild.firstChild.classList.contains('yellow') || square.firstChild.firstChild.classList.contains('red')))
        {
            square.firstChild.firstChild.classList.add(playerColor);
            break;
        }
    }

    turn++
}



populateBoard();
createBoard();
