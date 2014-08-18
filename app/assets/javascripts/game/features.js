var features = {};

features.teleportOne = function(person, starOne) {
  person.kill();
  person.reset(746,300);
};

features.teleportTwo = function(person, starTwo) {
  person.kill();
  person.reset(56,300);
};

features.loseLife = function(person, ghosts) {
  lives--;
  livesText.text = 'lives: ' + lives;
  person.kill();

  if (lives === 0) {
    features.gameOver("Player 2");
  } else {
    person.reset(100, 100);
  }
};

features.eatDot = function(person, dots) {
  score++;
  scoreText.text = 'score: ' + score;
  dots.kill();
}

features.powerUp = function(person, powerUp) {
  score += 5;
  scoreText.text = 'score: ' + score;
  powerUp.kill();
  person.powerUp = true;
}

features.gameOver = function(winner) {
  alert("game over winner: " + winner);
};

features.eatGhosts = function(person, ghosts) {
    ghosts.kill();
};

features.returnCoordinates = function(sprite) {
  var coordinates = [sprite.x, sprite.y];
  return coordinates;
};

