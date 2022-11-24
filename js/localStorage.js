'use strict';

//HOW TO USE????
function checkLocalStorageSupport() {
  if (typeof Storage !== 'undefined') {
    return true;
  } else {
    return false;
  }
}

localStorage.setItem(`easyHighScore`, score);
localStorage.setItem(`midiHighScore`, score);
localStorage.setItem(`beginnerHighScore`, score);
