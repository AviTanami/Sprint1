// numbers.sort(function (a, b) {
//   if (a > b) return 1;
//   if (a < b) return -1;
//   return 0;
// });

// function hideElement(selector) {
//   const el = document.querySelector(selector);
//   el.classList.add('hidden');
// }

// function showElement(selector) {
//   const el = document.querySelector(selector);
//   el.classList.remove('hidden');
// }

function createMat(ROWS, COLS) {
  var mat = [];
  for (var i = 0; i < ROWS; i++) {
    var row = [];
    for (var j = 0; j < COLS; j++) {
      row.push('');
    }
    mat.push(row);
  }
  return mat;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function hideElement(selector) {
  document.querySelector(selector).classList.add('hidden');
}

function showElement(selector) {
  document.querySelector(selector).classList.remove('hidden');
}

function playSound(soundSource) {
  var sound = new Audio('sound/eating-sound.mp3');
  sound.play();
}

function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j];
      const className = `cell cell-${i}-${j}`;
      strHTML += `<td class="${className}"> ${cell} </td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  const elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createCell(board, location) {
  const cell = {};
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      board[location.i][location.j] = cell;
    }
  }
}

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

// function setMinesNegsCount(cellI, cellJ, mat) {
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= mat.length) continue
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (i === cellI && j === cellJ) continue
//             if (j < 0 || j >= mat[i].length) continue
//             if (mat[i][j].isMine)
//                 mat[cellI][cellJ].minesAroundCount++
//         }
//     }
//     return mat[cellI][cellJ].minesAroundCount
// }

function drawNum(nums) {
  var randIdx = getRandomInt(0, nums.length);
  var num = nums[randIdx];
  nums.splice(randIdx, 1);
  return num;
}

function handleKey(event, i, j) {
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

// function getEmptyCells(board, cellI, cellJ) {
//   var emptyCells = [];
//   for (var i = 0; i < board.length; i++) {
//     for (var j = 0; j < board[0].length; j++) {
//       if (i === cellI && j === cellJ) continue;
//       emptyCells.push({ i, j });
//     }
//   }
//   return emptyCells;
// }

function getEmptyCell(board) {
  var emptyCells = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var cell = board[i][j];
      if (cell === null) {
        emptyCells.push({ i, j });
      }
    }
  }
  var randomIdx = getRandomInt(0, emptyCells.length);
  return emptyCells[randomIdx];
}
