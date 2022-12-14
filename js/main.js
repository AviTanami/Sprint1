'use strict';

//! DON'T FORGET TO PUT BEST SCORE -learn from W3schools - https://www.w3schools.com/html/html5_webstorage.asp

// if (typeof(Storage) !== "undefined") {
//     // Code for localStorage/sessionStorage.
//   } else {
//     // Sorry! No Web Storage support..
//   }

var audio;
var gBoard; //contains the object cell  - the model
var gEmptyCells = [];
const MINE = '💣';
const FLAG = '🚩';

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  minesLocations: [],
  isWin: false,
  safeCount: 0,
  livesCount: 1,
  minesExplodedCount: 0,
};
//

function onInitGame() {
  buildBoard();
  renderBoard();
}

function buildBoard() {
  //make the board mat and put each j cell a object contain curecell
  gBoard = [];

  for (var i = 0; i < gLevel.size; i++) {
    gBoard[i] = [];
    for (var j = 0; j < gLevel.size; j++) {
      var currCell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
        isExploded: false,
      };
      gBoard[i][j] = currCell;
    }
  }
  return gBoard;
}
//
// oncontextmenu for the right click disable
function renderBoard() {
  //render strhtml put a tr between open and close , send class as info i j location
  const eltBody = document.querySelector('tbody');
  var strHtml = '';
  for (var i = 0; i < gBoard.length; i++) {
    strHtml += '<tr>';
    for (var j = 0; j < gBoard.length; j++) {
      strHtml += `<td class="cell cell-${i}-${j} canReveal" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="cellMarked(event, this, ${i}, ${j})"> </td>`;
    }
    strHtml += '</tr>';
  }
  eltBody.innerHTML = strHtml;
  // console.log('strHtml:', strHtml);
}

function startGame(i, j) {
  gGame.isOn = true;
  setMines(i, j);
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      setMinesNegsCount(i, j, gBoard);
    }
  }
  startTime();
}

//count mines around cells
function setMinesNegsCount(cellI, cellJ, board) {
  //
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;

    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= board[i].length) continue;

      if (board[i][j].isMine) board[cellI][cellJ].minesAroundCount++;
    }
  }
  return board[cellI][cellJ].minesAroundCount;
}

function getEmptyCells(board, cellI, cellJ) {
  var emptyCells = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (i === cellI && j === cellJ) continue;
      emptyCells.push({ i, j });
    }
  }
  return emptyCells;
}

function setMines(clickedCellI, clickedCellJ) {
  gEmptyCells = getEmptyCells(gBoard, clickedCellI, clickedCellJ);
  for (var i = 0; i < gLevel.mines; i++) {
    var randomIdx = getRandomInt(0, gEmptyCells.length);
    const mineLocation = gEmptyCells[randomIdx];
    gBoard[mineLocation.i][mineLocation.j].isMine = true;
    gGame.minesLocations.push(mineLocation);
    gEmptyCells.splice(randomIdx, 1); //out of the array itself
  }
}

function checkWin() {
  // prettier-ignore
  const notMineCellsCount = gLevel.size ** 2 - gLevel.mines;
  if (gGame.shownCount !== notMineCellsCount) {
    return;
  }

  for (var i = 0; i < gGame.minesLocations.length; i++) {
    const mineLocation = gGame.minesLocations[i];
    const mineCell = gBoard[mineLocation.i][mineLocation.j];
    if (!mineCell.isMarked && !mineCell.isExploded) return;
  }
  //game is of - false and win on true
  clearInterval(gTimeIntervalId);
  gGame.isOn = false;
  gGame.isWin = true;
  enableRestartBtn();
  //Here need to save the local score affected by shortest time
}

function checkGameOver(elCell, i, j) {
  --gGame.livesCount;
  // gGame.livesCount-- if the minues after the gGame.livesCount it will be for next iteration
  renderLives();
  gGame.minesExplodedCount++;
  if (gGame.livesCount !== 0) {
    gBoard[i][j].isExploded = true;
    elCell.innerText = '💣';
    elCell.classList.remove('canReveal');
    elCell.classList.add('exploded');
    return;
  }
  // THE MODEL
  gGame.isOn = false;
  clearInterval(gTimeIntervalId);
  // THE DOM
  showAllMines();
  elCell.classList.add('clicked-mine');
  enableRestartBtn();
}

function showAllMines() {
  for (var i = 0; i < gGame.minesLocations.length; i++) {
    // THE MODEL
    const mineLocation = gGame.minesLocations[i];
    const mineCell = gBoard[mineLocation.i][mineLocation.j];
    mineCell.isShown = true;
    gGame.shownCount++;
    // THE DOM

    const elMineCell = document.querySelector(`.cell-${mineLocation.i}-${mineLocation.j}`);
    elMineCell.innerText = MINE;
    elMineCell.classList.add('shown');
  }
}

function restartGame() {
  //restarts all data..
  clearInterval(gTimeIntervalId);

  gGame.isOn = false;
  gGame.shownCount = 0;
  gGame.markedCount = 0;
  gGame.secsPassed = '0.000';
  gGame.livesCount = gLevel.lives;
  gGame.isWin = false;
  gGame.minesLocations = [];
  gGame.minesExplodedCount = 0;
  gStartTime = null;
  gTimeIntervalId = null;
  renderHintsCount();
  renderTimer();
  renderLives();
  disableRestartBtn();
  buildBoard();
  renderBoard();
}

function enableRestartBtn() {
  const elRestartBtnContainer = document.querySelector('.restart-btn-container');
  var btnStrHTML = `<button class="restart-btn" onclick="restartGame()">`;
  if (gGame.isWin) {
    btnStrHTML += '😊';
  } else {
    btnStrHTML += '😢';
  }
  btnStrHTML += '</button>';
  elRestartBtnContainer.innerHTML = btnStrHTML;
}

function disableRestartBtn() {
  const elBtnContainer = document.querySelector('.restart-btn-container');
  elBtnContainer.innerHTML = `<button class="restart-btn"()">😊</button>`;
}

function disableHover() {
  const elRevealCells = document.querySelectorAll('.canReveal');
  for (var i = 0; i < elRevealCells.length; i++) {
    const canRevealCell = elRevealCells[i];
    canRevealCell.classList.remove('canReveal');
  }
}

function renderLives() {
  var strHtmlLives = '';
  if (gGame.livesCount === 0) {
    strHtmlLives += '0';
  } else {
    for (var i = 0; i < gGame.livesCount; i++) {
      strHtmlLives += '💖';
    }
  }
  const elLives = document.querySelector('.lives');
  elLives.innerText = strHtmlLives;
}

function onSafeClick() {
  gGame.safeCount--;
  var randCell = getRandSafeCell();
  randCell.isSafe = true;
  renderBoard(gBoard);
  randCell.isSafe = false;
  setTimeout(renderBoard, 1500, gBoard);
  renderSafeCount();
}
