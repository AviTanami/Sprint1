'use strict';

//! I disablled the sound for now its too loud

function playSoundPop() {
  var sound = new Audio('sound/popSound.mp3');
  sound.play();
}

// function playSoundExploded() {
//   var sound = new Audio('sound/explodedSound.mp3');
//   sound.play();
// }

function playSoundFlagged() {
  var sound = new Audio('sound/flagSeatBeltSound.mp3');
  sound.play();
}
