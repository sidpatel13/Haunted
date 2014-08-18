var features = {};

features.loseLife = function(person, ghosts) {
  livesText.text = 'lives: ' + lives;
  person.kill();
  lives--;
  if (lives === 0) {
    gameOver("Player 2");
  } else {
    person.reset(100, 100);
  }
};

features.teleportOne = function(person, starOne) {
  person.kill();
  person.reset(746,300);
};

features.teleportTwo = function(person, starTwo) {
  person.kill();
  person.reset(56,300);
};
