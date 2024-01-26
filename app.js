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

const startPieces = [];

let turn = 0;
let lastPos;




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

    let playerColor;

    if (turn%2==0)
    {
        playerColor = storedPlayer1Color;
    } else {
        playerColor = storedPlayer2Color;
    }

    for(let i = (storedHeight * storedWidth) - storedWidth + col; i >= 0; i-=storedWidth)
    {
        var square = document.querySelector('div[square-id="' + i + '"]');

        if(!(square.firstChild.firstChild.classList.contains('yellow') || square.firstChild.firstChild.classList.contains('red')))
        {
            square.firstChild.firstChild.classList.add(playerColor);
            break;
        }
    }

    turn++;
}

function horizontal(squareId, color) {
    let count = 0;

    let row = (squareId / storedWidth) + 1;
    let upper = (storedWidth * row) - 1;
    let lower = upper - (storedWidth - 1);

    for(let i = lower; i < upper; i++)
    {
        var square = document.querySelector('div[square-id="' + i + '"]');

        if(count==3)
        {
            return true;
        } else if (square.firstChild.firstChild.classList.contains(color)) {
            count++;
        } else if (!square.firstChild.firstChild.classList.contains(color)) {
            count = 0;
        }
    }
    
    return false;
}

function vertical(squareId, color)
{
    let count = 0;

    let lower = (squareId / storedWidth);
    let upper = ((storedWidth * storedHeight) - 1) - ((storedWidth - 1) - lower);

    for(let i = lower; i < upper; i+=storedWidth)
    {
        var square = document.querySelector('div[square-id="' + i + '"]');
        
        if(count==3)
        {
            return true;
        } else if (square.firstChild.firstChild.classList.contains(color)) {
            count++;
        } else if (!square.firstChild.firstChild.classList.contains(color)) {
            count = 0;
        }
    }

    return false;
}

  private boolean leftDiagonal(int x, int y)
  {
    int startx, endx = 0;
    int starty, endy = 0;

    //for initial starting point for left to right
    if(x+y < altDeep)
    {
      startx = 0;
      starty = x+y;

      if(y <= altWide)
      {
        endx = x+y;
        endy = 0;
      } else {
        endx = altWide;
        endy = (x+y) - altWide;
      }
    } else {
      startx = (x+y) - altDeep;
      starty = altDeep;

      endx = altWide;
      //endy = altWide - hold - altDeep;
      endy = altWide - altDeep;
     }

    int count = 0;

    //check left to right, bottom up

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
      starty--;
    }

    return count==4;
  }

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

  public boolean hasWinner()
  {
    if(Main.turn < 7)
    {
      return false;
    }

    if (Main.turn > 10) {
      if (leftDiagonal(lastPos.get(0), lastPos.get(1))) {
        return true;
      } else if (rightDiagonal(lastPos.get(0), lastPos.get(1))) {
        return true;
      }
    }

    if(horizontal(lastPos.get(0), lastPos.get(1)))
    {
      return true;
    } else if (vertical(lastPos.get(0), lastPos.get(1))) {
      return true;
    }

    return false;
  }


populateBoard();
createBoard();
