'use strict';

var gHintCellLocations = [];
var gIsHint = false;

function nextClickHint(elBtn) {
  gIsHint = true;
  elBtn.classList.add('hidden');
}

// function hideElement(selector) {
//   const el = document.querySelector(selector);
//   el.classList.add('hidden');
// }

function showHint(cellI, cellJ) {
  gIsHint = false;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= gBoard.length) continue;
      const currCell = gBoard[i][j];
      gHintCellLocations.push({ i, j });
      const elCell = document.querySelector(`.cell-${i}-${j}`);
      elCell.classList.add('hint');
      if (currCell.isMine) elCell.innerText = MINE;
      else if (currCell.minesAroundCount === 0) elCell.innerText = ' ';
      else elCell.innerText = currCell.minesAroundCount;
    }
  }
  setTimeout(hideHint, 1000);
}

function hideHint() {
  for (var i = 0; i < gHintCellLocations.length; i++) {
    const hintLocation = gHintCellLocations[i];
    const cell = gBoard[hintLocation.i][hintLocation.j];
    const elCell = document.querySelector(`.cell-${hintLocation.i}-${hintLocation.j}`);
    elCell.classList.remove('hint');
    if (cell.isExploded) {
      elCell.innerText = MINE;
      continue;
    }
    if (cell.isMarked) {
      elCell.innerText = FLAG;
      continue;
    }
    if (cell.isShown) {
      if (cell.minesAroundCount === 0) elCell.innerText = ' ';
      else elCell.innerText = cell.minesAroundCount;
    } else elCell.innerText = ' ';
  }
  gHintCellLocations = [];
}

function renderHintsCount() {
  var strHtmlHints = '';
  for (var i = 0; i < gLevel.hints; i++) {
    strHtmlHints += '<button class="hint-btn" onclick="nextClickHint(this)">💡</button>';
  }
  const elHintsSpan = document.querySelector('.hints');
  elHintsSpan.innerHTML = strHtmlHints;
}

function nextSafeClick() {}
