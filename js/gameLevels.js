'use strict';

//!need to make a 7BOOM level and a custom place mine level!

const gLevel = {
  size: 4,
  mines: 2,
  lives: 1,
  hints: 3,
};

function easyLevel(size) {
  gLevel.size = size;
  gLevel.mines = 2; //no correllation between cells and mines count so its hard coded
  gLevel.lives = 2; // or just 1?
  gLevel.hints = 3;
  gGame.livesCount = 1;
  // renderHintsCount();
  // renderLives();
  restartGame();
}

function mediumLevel(size) {
  gLevel.size = size;
  gLevel.mines = Math.floor(size ** 2 / 4.5);
  // gLevel.mines = 14;
  gLevel.lives = 3;
  gLevel.hints = 3;
  gGame.livesCount = 2;
  // renderHintsCount();
  // renderLives();
  restartGame();
}

function expertLevel(size) {
  gLevel.size = size;
  gLevel.mines = Math.floor(size ** 2 / 4.5); //32
  // gLevel.mines = 32;
  gLevel.lives = 3;
  gLevel.hints = 3;
  gGame.livesCount = 3;
  // renderHintsCount();
  // renderLives();
  restartGame();
}

// function godLevel(size) {
//   gLevel.size = size;
//   gLevel.mines = 120;
//   gLevel.lives = 3;
//   gLevel.hints = 3;
//   gGame.livesCount = 3;
//   renderHintsCount();
//   renderLives();
//   restartGame();
// }
