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
