var features = {};

features.eatApple = function(person, apples) {
  score++;
  apples.kill();

  if (score === MAX_SCORE) {
    features.gameOver("Player 1");
  }
}

features.cherry = function(person, cherry) {
  cherry.kill();
  person.cherry = true;
  setTimeout(function(){person.cherry = false}, 5000);
}

features.speedUp = function(character, speedUp) {
  speedUp.kill();
  character.speedMultiplyer = 1.5;
  setTimeout(function(){person.speedMultiplyer = 1}, 5000);
}

features.slowDown = function(character, slowDown) {
  slowDown.kill();
  character.speedMultiplyer = 0.5;
  setTimeout(function(){person.speedMultiplyer = 1}, 5000);
}

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

features.pacMeetsGhost = function(person, ghost) {
  if (person.cherry === true){
    features.eatGhost(person, ghost);
  }
  else {
    features.loseLife(person, ghost);
  }
}

features.eatGhost = function(person, ghost) {
  ghost.kill();
  ghost.reset(Math.random() * CANVAS_WIDTH, Math.random() * CANVAS_HEIGHT);
};

features.loseLife = function(person) {
  lives--;
  person.kill();

  if (lives === 0) {
    features.gameOver("Player 2");
  } else {
    person.reset(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }
};

features.gameOver = function(winner) {
  alert("Game Over. " + winner + " wins!");
  location.reload();
};
