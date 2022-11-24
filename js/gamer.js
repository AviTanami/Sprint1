'use strict';

var gTimeIntervalId;
var gStartTime;

function cellClicked(elCell, i, j) {
  // on first click
  if (!gTimeIntervalId) {
    startGame(i, j);
  }
  if (!gGame.isOn) return;
  const cell = gBoard[i][j];
  if (cell.isShown || cell.isMarked || cell.isExploded) return;
  if (gIsHint) {
    showHint(i, j);
    return;
  }
  if (cell.isMine) {
    // playSoundExploded(); // It's too loud
    gameOver(elCell, i, j);
    return;
  }
  cell.isShown = true;
  gGame.shownCount++;
  elCell.classList.add('shown');
  elCell.classList.remove('clickable');
  //put audio
  playSoundPop();
  if (cell.minesAroundCount !== 0) {
    // THE DOM
    elCell.innerText = cell.minesAroundCount;
  } else {
    elCell.innerText = ' ';
    expandShown(i, j);
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

function expandShown(cellI, cellJ) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      const currCell = gBoard[i][j];
      if (j < 0 || j >= gBoard.length) continue;
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
      elCurrCell.classList.remove('clickable');
      if (currCell.minesAroundCount === 0) {
        elCurrCell.innerText = ' ';
        expandShown(i, j);
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
  renderStopwatch();
}

function renderStopwatch() {
  const elStopwatch = document.querySelector('.timer');
  elStopwatch.innerHTML = gGame.secsPassed;
}
