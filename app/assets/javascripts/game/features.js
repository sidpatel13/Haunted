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
    person.reset(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }
};

features.eatDot = function(person, dots) {
  score++;
  dots.kill();

  if (score === MAX_SCORE) {
    features.gameOver("Player 1");
  }
}

features.powerUp = function(person, powerUp) {
  powerUp.kill();
  person.powerUp = true;
  setTimeout(function(){person.powerUp = false}, 5000);
}

features.gameOver = function(winner) {
  alert("Game Over. " + winner + " wins!");
  location.reload();
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


features.togglePause = function () {
  document.onkeydown = function (e) {
    if(e.which == 80) {
      fb.pause.set(true);
    } else if (e.which == 82) {
      fb.pause.set(false);
    }
  }
}
