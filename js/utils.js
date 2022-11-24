'use strict';

//! good utils to use - there are some utils that has an important global vars we use in, so before any use see if its good to use or add the changes.

//? GLOBAL VAR USE

const GAMER_IMG = '<img src="img/gamer.png">';
const WIN_SOUND = new Audio('sound/win.mp3');
// WIN_SOUND.play();

//todo: resetNums()
//todo: drawNum()
//todo: getRandomInt - EXCLUSIVE
//todo: getRandomInt - INCLUSIVE
//todo: createBoard() using global var
//todo: renderBoard(board) - using argument
//todo: renderBoard(mat, selector)
//todo: renderBoard(board) - with data i, data j, has a classname in the html string to use
//todo: copyMat - copy a mat
//todo: createBalloons() - creates a ballon (into array) with using another function create balloon (single)
//todo: shuffle() - the first way
//todo: ----🈴🈴🈴🈴 here I need to put shuffle the SECOND WAY🈴🈴🈴🈴🈴
//todo: renderCell(location, value)
//todo: getRandomColor() - in hex# good to render into html
//todo: hideElement(selector) - insert a selector and hides it - need to create css hidden
//todo: showElement(selector) - insert a selector and shows it - by remove the classList
//todo: getEmptyCell() get an empty cell from array and returns a RANDOM INDEX CELL
//todo: countFoodAround(board, rowIdx, colIdx) - like countNegsAround - runs on all the negs - USING a board,rowIdx,ColIdx inputs.
//todo: countNeighbors(cellI, cellJ, mat) - LIKE THE PACMAN GAME
//todo: buildBoard() - for the food and wall game - NEED TO ADJUST THE FUNCTION
//todo: getClassName(location) - return a className if you put a object input with i.j locations
//todo: getNextLocation(eventKeyboard) - DONT FORGET TO ADD EVENT LISTNER IN HTML - USE WHEN USER HIT A ARROWKEY ONT HE KEYBOARD - returns an object with locations
//todo: onHandleKey() - just like the getNextLocation but returns i.j
//todo: numbers.sort - sort the numbers (has a short arrow function in it)
//todo: getTime()

//* GETS AN EMPTY GLOBAL VAR OF GNUMS AND BUILDS IT ACCORDING TO THE GNUMSRANGE LENGTH
function resetNums() {
  gNums = [];
  for (var i = 0; i < gNumsRange; i++) {
    gNums.push(i + 1);
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////
//* DRAWS A RANDOM NUMBER FROM GNUMS ARRAY AND SPLICES THAT NUM SO IT WONT REPEAT ITSELF
function drawNum() {
  var randIdx = getRandomInt(0, gNums.length);
  var num = gNums[randIdx];
  gNums.splice(randIdx, 1);
  return num;
}

/////////////////////////////////////////////////////////////////////
//* DRAW a RAN num from nums input and splice it out of the array
function drawNum(nums) {
  var idx = getRandomInt(0, nums.length);
  var num = nums[idx];
  nums.splice(idx, 1);

  return num;
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* GET RANDOM INT INCLUSIVE / EXCLUSIVE

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//* GET RANDOM INT INCLUSIVE / INCLUSIVE

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* CREATES BOARD ACCORDING TO GLOBAL SIZE VAR
function createBoard() {
  var size = gSize;
  const board = [];
  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0; j < size; j++) {
      board[i][j] = VAR;
    }
  }
  return board;
}
///////////////////////////////////////////////////////////////////////////////////////////////
//* GETS A BOARD FROM CREATEBOARD AND RENDERING IT TO THE DOM
function renderBoard(board) {
  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j];
      strHTML += `<td data-i="${i}" data-j="${j}" onclick="onCellClicked(this, ${currCell})" >${currCell}</td>`;
    }
    strHTML += '</tr>';
  }
  const elBoard = document.querySelector('.board');
  elBoard.innerHTML += strHTML;
}
///////////////////////////////////////////////////////////////////////////////////////////
//*renders a board and has a class name to use and insert to tbody.board

function renderBoard(board) {
  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      strHTML += `<td data-i="${i}" data-j="${j}" onclick="onCellClicked(this, ${i}, ${j})" class="${className} ">${cell}</td>`;
    }
    strHTML += '</tr>';
  }
  const elBoard = document.querySelector('tbody.board');
  elBoard.innerHTML = strHTML;
}
//////////////////////////////////////////////////////////////////////////////////////////////
//* RENDER A BOARD with the table element itself.
//* gets a mat and selector.

function renderBoard(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j];
      const className = `cell cell-${i}-${j}`;

      strHTML += `<td class="${className}">${cell}</td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';

  const elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* INCASE WE NEED TO WORK/RENDER ON NEW MATRIX - DO NOT USE SPLICE IT SHALLOW COPY
function copyMat(mat) {
  var newMat = [];
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = [];
    for (var j = 0; j < mat[0].length; j++) {
      newMat[i][j] = mat[i][j];
    }
  }
  return newMat;
}
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
//* CREATE ANY ITEM
function createBalloons(count) {
  var balloons = [];
  for (var i = 0; i < count; i++) {
    var balloon = createBalloon(i);
    balloons.push(balloon);
  }
  return balloons;
}

///////////////////////////////////////////////////////////////////////////////////////////////
function shuffle(items) {
  var randIdx, keep, i;
  for (i = items.length - 1; i > 0; i--) {
    randIdx = getRandomInt(0, items.length - 1);

    keep = items[i];
    items[i] = items[randIdx];
    items[randIdx] = keep;
  }
  return items;
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* RENDER ONLY CELL TO DOM
// location is an object like this - { i: 2, j: 7 } or location.i:i , location.j : j
function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}
///////////////////////////////////////////////////////////////
//* RENDER A CELL FROM LOCATION USING GETCLASSNAME FUNC AND RETURN the value into the innerHTML
function renderCell(location, value) {
  const cellSelector = '.' + getClassName(location); // cell-i-j
  const elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}

///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//* GET RANDOM COLOR
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

///////////////////////////////////////////////////////////////////////////////////////////////

//* SHOW / HIDE ELEMENT
function hideElement(selector) {
  const el = document.querySelector(selector);
  el.classList.add('hidden');
}

function showElement(selector) {
  const el = document.querySelector(selector);
  el.classList.remove('hidden');
}

//////////////////////////////////////////////////////////

//* GET ANY CELL TO AN ARRAY
function getEmptyCell(board) {
  const emptyCells = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var currCell = board[i][j];
      if (currCell.gameElement === null && currCell.type !== WALL) emptyCells.push({ i: i, j: j });
    }
  }
  //* CHOOSE A RANDOM INDEX FROM THAT ARRAY AND RETURN THE CELL ON THAT INDEX
  const randomIdx = getRandomInt(0, emptyCells.length - 1);
  return emptyCells[randomIdx];
}

//////////////////////////////////////////////////////////
//* NEGS LOOP
function countFoodAround(board, rowIdx, colIdx) {
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (i === rowIdx && j === colIdx) continue;
      if (j < 0 || j >= board[0].length) continue;
      var currCell = board[i][j];
    }
  }
}

//////////////////////////////////////////////////////////
//* NEGS LOOP like in the pacman GAME
function countNeighbors(cellI, cellJ, mat) {
  var neighborsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;

    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= mat[i].length) continue;

      if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) neighborsCount++;
    }
  }
  return neighborsCount;
}

//////////////////////////////////////////////////////////////////////////////
//*builds a board but a specific one with islands inside from the food player game

function buildBoard() {
  const size = 10;
  const board = [];

  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD;
      if (i === 0 || i === size - 1 || j === 0 || j === size - 1 || (j === 3 && i > 4 && i < size - 2)) {
        board[i][j] = WALL;
      }
    }
  }
  return board;
}

////////////////////////////////////////////////////////////
//* return a cellClass by input a object with location keys and values (location.i , location.j)

function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j;
  return cellClass;
}

///////////////////////////////////////////////////////////////////////
//* getting next location with an EVENT LISTENER - NEED TO ADD HANDLE ON KEY IN HTML !
//* works for arrowkeys only! can adjust by the key name find in the console.log

//* IT USES A GLOBAL VAR FROM GAMER POSITION
//* NEED TO SEE HOW TO USE IT (WHAT TO RETURN to where)

function onHandleKey(event) {
  const i = gGamerPos.i;
  const j = gGamerPos.j;
  console.log('event.key:', event.key);

  switch (event.key) {
    case 'ArrowLeft':
      moveTo(i, j - 1);
      break;
    case 'ArrowRight':
      moveTo(i, j + 1);
      break;
    case 'ArrowUp':
      moveTo(i - 1, j);
      break;
    case 'ArrowDown':
      moveTo(i + 1, j);
      break;
  }
}

///////////////////////////////////////////////////////
//* getting next location with an EVENT LISTENER - NEED TO ADD HANDLE ON KEY IN HTML !
//* works for arrowkeys only! can adjust by the key name find in the console.log

function getNextLocation(eventKeyboard) {
  // console.log(eventKeyboard)
  const nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  // DONE: figure out nextLocation
  switch (eventKeyboard) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
  }

  return nextLocation; //RETURNS AN OBJECT
}

////////////////////////////////////////////////////////////////
//*SORTING NUMS

// numbers.sort(function (a, b) {
//   if (a > b) return 1;
//   if (a < b) return -1;
//   return 0;
// });

//////////////////////////////////////////////////////////////
//* time from specific time stamp when it called.

function getTime() {
  return new Date().toString().split(' ')[4];
}

// a copy before the arrange
// the upper is better and more functions

// //* GETS AN EMPTY GLOBAL VAR OF GNUMS AND BUILDS IT ACCORDING TO THE GNUMSRANGE LENGTH
// function resetNums() {
//     gNums = []
//     for (var i = 0; i < gNumsRange; i++) {
//         gNums.push(i + 1)
//     }
// }
// ///////////////////////////////////////////////////////////////////////////////////////////////
// //* DRAWS A RANDOM NUMBER FROM GNUMS ARRAY AND SPLICES THAT NUM SO IT WONT REPEAT ITSELF
// function drawNum() {
//     var randIdx = getRandomInt(0, gNums.length)
//     var num = gNums[randIdx]
//     gNums.splice(randIdx, 1)
//     return num
// }

// ///////////////////////////////////////////////////////////////////////////////////////////////
// //* GET RANDOM INT INCLUSIVE / EXLUCIVE
// function getRandomIntInclusive(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }

// //!/

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min)) + min;
// }

// ///////////////////////////////////////////////////////////////////////////////////////////////
// //* CREATES BOARD ACCORDING TO GLOBAL SIZE VAR
// function createBoard() {
//   var size = gSize
//   const board = []
//   for (var i = 0; i < size; i++) {
//       board.push([])
//       for (var j = 0; j < size; j++) {
//           board[i][j] = VAR
//       }
//   }
//   return board
// }
// ///////////////////////////////////////////////////////////////////////////////////////////////
//   //* GETS A BOARD FROM CREATEBOARD AND RENDERING IT TO THE DOM
//   function renderBoard(board) {
//     var strHTML = ''
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>'
//         for (var j = 0; j < board[0].length; j++) {
//             var currCell = board[i][j]
//             strHTML += `<td data-i="${i}" data-j="${j}" onclick="onCellClicked(this, ${currCell})" >${currCell}</td>`
//         }
//         strHTML += '</tr>'
//     }
//     const elBoard = document.querySelector('.board')
//     elBoard.innerHTML += strHTML
// }

//   ///////////////////////////////////////////////////////////////////////////////////////////////
//   //* INCASE WE NEED TO WORK/RENDER ON NEW MATRIX
//   function copyMat(mat) {
//     var newMat = []
//     for (var i = 0; i < mat.length; i++) {
//       newMat[i] = []
//       for (var j = 0; j < mat[0].length; j++) {
//         newMat[i][j] = mat[i][j]
//       }
//     }
//     return newMat
//   }

//   ///////////////////////////////////////////////////////////////////////////////////////////////
//   //* CREATE ANY ITEM
//   function createBalloons(count) {
//     var balloons = []
//     for (var i = 0; i < count; i++) {
//       var balloon = createBalloon(i)
//       balloons.push(balloon)
//     }
//     return balloons
//   }

//   ///////////////////////////////////////////////////////////////////////////////////////////////
//   function shuffle(items) {
//     var randIdx, keep, i;
//     for (i = items.length - 1; i > 0; i--) {
//       randIdx = getRandomInt(0, items.length - 1);

//       keep = items[i];
//       items[i] = items[randIdx];
//       items[randIdx] = keep;
//     }
//     return items;
//   }

//   ///////////////////////////////////////////////////////////////////////////////////////////////
//   //* RENDER ONLY CELL TO DOM
//   // location is an object like this - { i: 2, j: 7 }
// function renderCell(location, value) {
//   // Select the elCell and set the value
//   const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
//   elCell.innerHTML = value
// }
// ////////////////////////////////////////////////////////////////
// //* GET RANDOM COLOR
// function getRandomColor() {
//   const letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }
// ///////////////////////////////////////////////////////////////////////////////////////////////

// //* SHOW / HIDE ELEMENT
// function hideElement(selector) {
//   const el = document.querySelector(selector)
//   el.classList.add('hidden')
// }

// function showElement(selector) {
//   const el = document.querySelector(selector)
//   el.classList.remove('hidden')
// }

// ///////////////////////////////////////////////////////////////////////////////////////////////
// //* GET ANY CELL TO AN ARRAY
// function getEmptyCell(board) {
//   const emptyCells = []
//   for (var i = 0; i < board.length; i++) {
//       for (var j = 0; j < board[i].length; j++) {
//           var currCell = board[i][j]
//           if (currCell.gameElement === null && currCell.type !== WALL)
//               emptyCells.push({ i: i, j: j })
//       }
//   }
//   //* CHOOSE A RANDOM INDEX FROM THAT ARRAY AND RETURN THE CELL ON THAT INDEX
//   const randomIdx = getRandomInt(0, emptyCells.length - 1)
//   return emptyCells[randomIdx]
// }

// ///////////////////////////////////////////////////////////////////////////////////////////////
// //* NEIGHBORS LOOP
// function countFoodAround(board, rowIdx, colIdx) {

//   for (var i = rowIdx -1 ; i <= rowIdx +1;i++) {
//     if (i<0 || i >= board.length) continue

//     for (var j = colIdx -1 ; j <= colIdx +1 ; j++) {
//       if (i === rowIdx && j === colIdx) continue
//       if (j <0|| j >= board[0].length) continue
//       var currCell = board[i][j]
//     }
//   }
// }
