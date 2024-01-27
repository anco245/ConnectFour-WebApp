const gameboard = document.querySelector("#gameboard");

//graphic to represent an empty space on the board
const empty = '<div class="piece"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z\"/></svg></div>';

// Retrieve the height and width of the board from sessionStorage
const storedHeight = sessionStorage.getItem("inputHeight");
const storedWidth = sessionStorage.getItem("inputWidth");

// Applies the given height and weight to the create the size of the board
document.getElementById("gameboard").style.height = (storedHeight * 60) + "px";
document.getElementById("gameboard").style.width = (storedWidth * 60) + "px";

const storedPlayer1Color = sessionStorage.getItem("inputPlayer1Color");
const storedPlayer2Color = sessionStorage.getItem("inputPlayer2Color");

let currentColor;

let turn = 0;

const startPieces = [];

let lastPos;

let winner = 0;

var leftSide = [];
var rightSide = [];

for(let i = (storedWidth-1); i < (storedWidth*storedHeight); i+=(storedWidth-1))
{
  leftSide.push(i);
}

for(let i = 0; i <= storedWidth * (storedHeight-1); i+=(storedWidth-1))
{
  rightSide.push(i);
}


function populateBoard() {
    for(let i = 0; i < storedHeight * storedWidth; i++)
    {
        startPieces.push(empty);
    }
}

function createBoard() {
    startPieces.forEach((startPieces, i) => {
        const square = document.createElement('div');

        square.classList.add('square');
        square.innerHTML = startPieces;

        square.setAttribute('square-id', i);

        gameboard.append(square);
    })
}

function insert(col) {

    col = col-1;

    if(turn%2==0)
    {
        currentColor = storedPlayer1Color;
    } else {
        currentColor = storedPlayer2Color;
    }

    for(let i = (storedHeight * storedWidth) - storedWidth + col; i >= 0; i-=storedWidth)
    {
        var square = document.querySelector('div[square-id="' + i + '"]');

        if(!(square.firstChild.firstChild.classList.contains('yellow') || square.firstChild.firstChild.classList.contains('red')))
        {
            square.firstChild.firstChild.classList.add(currentColor);
            lastPos = i;
            break;
        }
    }

    turn++;
}

function horizontal(squareId) {
    let count = 0;

    if((turn-1)%2==0)
    {
        currentColor = storedPlayer1Color;
    } else {
        currentColor = storedPlayer2Color;
    }

    let row = Math.floor(squareId / storedWidth) + 1;
    let upper = (storedWidth * row) - 1;
    let lower = upper - (storedWidth - 1);

    for(let i = lower; i <= upper; i++)
    {
        var square = document.querySelector('div[square-id="' + i + '"]');

        if(count==3)
        {
            return true;
        } else if (square.firstChild.firstChild.classList.contains(currentColor)) {
            count++;
        } else if (!square.firstChild.firstChild.classList.contains(currentColor)) {
            count = 0;
        }
    }
    
    return false;
}

function vertical(squareId)
{
    let count = 0;

    if((turn-1)%2==0)
    {
        currentColor = storedPlayer1Color;
    } else {
        currentColor = storedPlayer2Color;
    }

    let lower = Math.floor(squareId / storedWidth) - 1;
    let upper = ((storedWidth * storedHeight) - 1) - ((storedWidth - 1) - lower);

    for(let i = parseInt(lower); i <= parseInt(upper); i+=parseInt(storedWidth))
    {
        var square = document.querySelector('div[square-id="' + i + '"]');
        
        if(count==3)
        {
            return true;
        } else if (square.firstChild.firstChild.classList.contains(currentColor)) {
            count++;
        } else if (!square.firstChild.firstChild.classList.contains(currentColor)) {
            count = 0;
        }
    }

    return false;
}



function leftDiagonal(squareId)
{//for initial starting point for left to right

  var upper = parseInt(squareId);
  var lower = parseInt(squareId);

  while(lower > (storedWidth-1))
  {
    lower-=(storedWidth-1);
  }

  while(upper < (storedWidth * storedHeight - 1) - (storedWidth-1))
  {
    upper+=(storedWidth-1);
  }

}

  /*
  private boolean rightDiagonal(int x, int y)
  {
    int startx, starty = 0;
    int endx, endy = 0;
    int count = 0;

    //for initial starting point for right to left
    if(x > y)
    {
      startx = x-y;
      starty = 0;

      endx = altWide;
      endy = altWide - startx;
    } else if (x < y) {
      startx = 0;
      starty = y-x;

      endx = altDeep - starty;
      endy = altDeep;
    } else {
      startx = 0;
      starty = 0;

      endx = altWide;
      endy = altWide;
    }

    while(startx <= endx)
    {
      if (count==4) {
        return true;
      } else if (board[startx][starty].equals(Main.currentPlayer)) {
        count++;
      } else if (!board[startx][starty].equals(Main.currentPlayer)) {
        count = 0;
      }

      startx++;
      starty++;
    }

    return count==4;
  }
*/

function hasWinner()
{
    if(turn < 7)
    {
        //return false;
    }

    /*
    if (turn > 10) {
      if (leftDiagonal(lastPos.get(0), lastPos.get(1))) {
        return true;
      } else if (rightDiagonal(lastPos.get(0), lastPos.get(1))) {
        return true;
      }
    }
    */

    if(turn == 3 && leftDiagonal(lastPos))
    {
      return true;
    }

    /*
    if(horizontal(lastPos, currentColor))
    {
      if(currentColor == storedPlayer1Color)
      {
        winner = 1;
        return true;
      } else {
        winner = 2;
        return true;
      }
    } else if (vertical(lastPos, currentColor)) {
        if(currentColor == storedPlayer1Color)
        {
            winner = 1;
            return true;
        } else {
            winner = 2;
            return true;
        }
    }
    */

    return false;
}


populateBoard();
createBoard();
