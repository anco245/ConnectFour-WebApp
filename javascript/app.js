const gameboard = document.querySelector("#gameboard");
const columnLabels = document.querySelector("#columnLabels")

//graphic to represent an empty space on the board
const empty = '<div class="piece"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z\"/></svg></div>';

// Retrieve the height and width of the board from sessionStorage
const storedHeight = sessionStorage.getItem("inputHeight");
const storedWidth = sessionStorage.getItem("inputWidth");

// Applies the given height and weight to the create the size of the board
document.getElementById("gameboard").style.height = (storedHeight * 60) + "px";
document.getElementById("gameboard").style.width = (storedWidth * 60) + "px";
document.getElementById("gameboard").style.top = "0px";

document.getElementById("columnLabels").style.maxWidth = (storedWidth * 60) + "px";
document.getElementById("columnLabels").style.minWidth = (storedWidth * 60) + "px";

const storedPlayer1Color = sessionStorage.getItem("inputPlayer1Color");
const storedPlayer2Color = sessionStorage.getItem("inputPlayer2Color");

const startPieces = [];
let labelsArray = [];

//populating div
for(let i = 1; i <= storedWidth; i++)
{
  labelsArray.push(i);
}

let currentColor;
let turn = 0;
let lastPos;
let winner = 0;

function populateBoard() {
    for(let i = 0; i < storedHeight * storedWidth; i++)
    {
        startPieces.push(empty);
    }
}

function createLabels() {
  labelsArray.forEach((labelsArray, i) => {
      const square = document.createElement('div');

      square.classList.add('label');
      square.innerHTML = labelsArray;

      square.setAttribute('label-num', i);

      document.getElementById("gameboard").style.width = (storedWidth * 60) + "px";

      square.style.height = (storedHeight * 75) + "px";

      columnLabels.append(square);
  })
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

    //make it so that it's checked if a piece is being placed in a column that's already full

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

        if (square.firstChild.firstChild.classList.contains(currentColor)) {
          count++;

          if(count==4)
          {
            return true;
          }
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

    let lower = squareId;

    while(lower > storedWidth)
    {
      lower = lower - storedWidth;
    }
    
    let upper = ((storedWidth * storedHeight) - 1) - ((storedWidth - 1) - lower);

    for(let i = parseInt(lower); i <= parseInt(upper); i+=parseInt(storedWidth))
    {
      var square = document.querySelector('div[square-id="' + i + '"]');
        
      if (square.firstChild.firstChild.classList.contains(currentColor)) {
        count++;

        if(count==4)
        {
          return true;
        }
      } else if (!square.firstChild.firstChild.classList.contains(currentColor)) {
          count = 0;
      }
    }

    return false;
}

function forwardSlash(squareId)
{
  let count = 0;
  var upper = parseInt(squareId);
  var lower = parseInt(squareId);

  if((turn-1)%2==0)
  {
    currentColor = storedPlayer1Color;
  } else {
    currentColor = storedPlayer2Color;
  }

  while(lower > (storedWidth-1))
  {
    lower = lower - (storedWidth-1);
  }

  while(upper < (storedWidth * storedHeight - 1) - (storedWidth-1))
  {
    upper = upper + parseInt(storedWidth-1);
  }

  for(let i = parseInt(lower); i <= upper; i+=(storedWidth-1))
  {
    var square = document.querySelector('div[square-id="' + i + '"]');
        
    if (square.firstChild.firstChild.classList.contains(currentColor)) {
      count++;

      if(count==4)
      {
        return true;
      }
    } else if (!square.firstChild.firstChild.classList.contains(currentColor)) {
        count = 0;
    }
  }
}

function backSlash(squareId)
{
  let count = 0;
  var upper = parseInt(squareId);
  var lower = parseInt(squareId);

  if((turn-1)%2==0)
  {
    currentColor = storedPlayer1Color;
  } else {
    currentColor = storedPlayer2Color;
  }

  //false
  while(!(lower > storedWidth || lower%storedWidth == 0))
  {
    lower = lower - (parseInt(storedWidth)+1);
  }

  while(upper < (storedWidth * storedHeight - 1) - (storedWidth-1))
  {
    upper = upper + (parseInt(storedWidth)+1);
  }

  for(let i = parseInt(lower); i <= upper; i+=(parseInt(storedWidth)+1))
  {
    var square = document.querySelector('div[square-id="' + i + '"]');
        
    if (square.firstChild.firstChild.classList.contains(currentColor)) {
      count++;

      if(count==4)
      {
        return true;
      }
    } else if (!square.firstChild.firstChild.classList.contains(currentColor)) {
        count = 0;
    }
  }
}

function hasWinner()
{
    if(turn < 7)
    {
        return false;
    }

    if(horizontal(lastPos) || vertical(lastPos) || forwardSlash(lastPos) ||
        backSlash(lastPos))
    {
      if(currentColor == storedPlayer1Color)
      {
        winner = 1;
        return true;
      } else {
        winner = 2;
        return true;
      }
    }

    return false;
}

populateBoard();
createBoard();
createLabels();

document.addEventListener('DOMContentLoaded', function () {
  var centeredDiv = document.getElementById('gameboard');
  var rect = centeredDiv.getBoundingClientRect();

  document.getElementById("columnLabels").style.right = rect.right + "px";
  document.getElementById("columnLabels").style.left = rect.left + "px";
});

// Get all the label elements within the grid
var labs = columnLabels.getElementsByClassName('label');


// Add click event listener to each label
for (var i = 0; i < labs.length; i++) {
  labs[i].addEventListener('click', handleClick);
}

// Define the function to be called when a label is clicked
function handleClick(event) {

  // Identify the clicked label using its ID or other properties
  var clickedLabelNum = parseInt(event.target.getAttribute('label-num'));
  
  insert((clickedLabelNum + 1));

  if(hasWinner()) {
    var message = "<strong>Congratulations Player " + winner + "! You Win</strong>";
    document.getElementById("winningMessage").innerHTML = message;
    document.getElementById("winningMessage").style.border = "2px dotted black";

    for (var i = 0; i < labs.length; i++) {
      labs[i].removeEventListener("click", handleClick);
    }

  } else if (turn == storedWidth*storedHeight) {
    var message = "<strong>It's a tie</strong>";
    document.getElementById("winningMessage").innerHTML = message;
    document.getElementById("winningMessage").style.border = "2px dotted black";

    for (var i = 0; i < labs.length; i++) {
      labs[i].removeEventListener("click", handleClick);
    }
  }
}
