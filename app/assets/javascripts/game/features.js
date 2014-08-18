var features = {};

features.teleportOne = function(person, starOne) {
  person.kill();
  person.reset(790,358);
  person.body.velocity.x = -200;
};

features.teleportTwo = function(person, starTwo) {
  person.kill();
  person.reset(40,358);
  person.body.velocity.x = 200;
};

features.loseLife = function(person, ghosts) {
  lives--;
  person.kill();

  if (lives === 0) {
    features.gameOver("Player 2");
  } else {
    person.reset(100, 100);
  }
};

features.eatDot = function(person, dots) {
  score++;
  dotCount--;
  dots.kill();

  if (dotCount === 0 && powerUpCount === 0) {
    features.gameOver("Player 1");
  }
}

features.powerUp = function(person, powerUp) {
  score += 5;
  powerUpCount--;
  powerUp.kill();
  person.powerUp = true;
  setTimeout(function(){person.powerUp = false}, 5000);

  if (dotCount === 0 && powerUpCount === 0) {
    features.gameOver("Player 1");
  }
}

features.gameOver = function(winner) {
  alert("Winner: " + winner);
};

features.eatGhosts = function(person, ghosts) {
    ghostLives--;
    ghosts.kill();

    if (ghostLives === 0) {
      features.gameOver("Player 1");
    }
};

features.pacMeetsGhost = function(person, ghosts) {
  if (person.powerUp === true){
    features.eatGhosts(person, ghosts);
  }
  else {
    features.loseLife(person, ghosts);
  }
}

features.changeMusicVolume = function() {
    // if (pointer.y < 300){
    //     music.volume += 0.1;
    // } else {
    //     music.volume -= 0.1;
    // }
};
