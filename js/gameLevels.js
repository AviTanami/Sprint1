'use strict';

//!need to make a 7BOOM level and a custom place mine level

const gLevel = {
  size: 4,
  mines: 2,
  lives: 1,
  hints: 1,
};

function EasyLevel() {
  gLevel.size = 4;
  gLevel.mines = 2;
  gLevel.lives = 1;
  gLevel.hints = 1;
  gGame.livesCount = 1;
  renderHintsCount();
  renderLives();
  restartGame();
}

function MediumLevel() {
  gLevel.size = 8;
  gLevel.mines = 12;
  gLevel.lives = 2;
  gLevel.hints = 2;
  gGame.livesCount = 2;
  renderHintsCount();
  renderLives();
  restartGame();
}

function ExpertLevel() {
  gLevel.size = 12;
  gLevel.mines = 30;
  gLevel.lives = 3;
  gLevel.hints = 3;
  gGame.livesCount = 3;
  renderHintsCount();
  renderLives();
  restartGame();
}
