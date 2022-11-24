'use strict';

var gTimeIntervalId;
var gStartTime;

function cellClicked(elCell, i, j) {
  // console.log('elCell:', elCell);
  if (!gTimeIntervalId) {
    startGame(i, j);
  }
  if (!gGame.isOn) return;
  const cell = gBoard[i][j];
  if (cell.isMarked || cell.isShown || cell.isExploded) return;
  if (gIsHint) {
    showHint(i, j);
    return;
  }
  if (cell.isMine) {
    // playSoundExploded(); // It's too loud
    checkGameOver(elCell, i, j);
    return;
  }
  cell.isShown = true;
  gGame.shownCount++;
  elCell.classList.add('shown');
  elCell.classList.remove('canReveal');
  //put audio
  playSoundPop();
  if (cell.minesAroundCount !== 0) {
    // THE DOM
    elCell.innerText = cell.minesAroundCount;
  } else {
    elCell.innerText = ' ';
    expandShown(gBoard, i, j);
  }
  checkWin();
}

function cellMarked(ev, elCell, i, j) {
  ev.preventDefault();
  if (!gTimeIntervalId) startGame(i, j);
  if (!gGame.isOn) return;
  const cell = gBoard[i][j];
  if (cell.isShown) return;
  // THE MODEL
  if (!cell.isMarked) {
    cell.isMarked = true;
    gGame.markedCount++;
    // THE DOM
    elCell.innerText = FLAG;
    playSoundFlagged();
  } else {
    // THE MODEL
    cell.isMarked = false;
    gGame.markedCount--;
    // THE DOM
    elCell.innerText = ' ';
  }
  checkWin();
}

function expandShown(board, cellI, cellJ) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      const currCell = board[i][j];
      if (j < 0 || j >= board.length) continue;
      if (cellI === i && cellJ === j) continue;
      if (currCell.isMine) continue;
      if (currCell.isMarked) continue;
      if (currCell.isShown) continue;
      // THE MODEL
      currCell.isShown = true;
      gGame.shownCount++;
      // THE DOM
      var elCurrCell = document.querySelector(`.cell-${i}-${j}`);
      elCurrCell.classList.add('shown');
      elCurrCell.classList.remove('canReveal');
      if (currCell.minesAroundCount === 0) {
        elCurrCell.innerText = ' ';
        expandShown(board, i, j);
      } else {
        elCurrCell.innerText = currCell.minesAroundCount;
      }
    }
  }
}

// function getTime() {
//     return new Date().toString().split(' ')[4];
//   }

function startTime() {
  gStartTime = Date.now();
  gTimeIntervalId = setInterval(setTime, 10);
}

function setTime() {
  const timeDiff = (Date.now() - gStartTime) / 1000;
  gGame.secsPassed = timeDiff.toFixed(3);
  renderTimer();
}

function renderTimer() {
  const elTimer = document.querySelector('.timer');
  elTimer.innerHTML = gGame.secsPassed;
}
