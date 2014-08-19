var gameCharacters = {};

gameCharacters.createCharacters = function() {
  gameCharacters.createPerson();
  gameCharacters.createGhost();
}

gameCharacters.createPerson = function() {
  person = game.add.sprite(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 'sprites');
  person.scale.setTo(1.2, 1.2);
  person.anchor.setTo(0.5, 0.5);
  person.userControl = false;
  person.animations.add('right', [10, 11], 0, true);
  person.animations.add('bottom', [24, 25], 0, true);
  person.animations.add('left', [38, 39], 0, true);
  person.animations.add('up', [52, 53], 0, true);
  person.powerUp = false;
  person.lastx = person.x;
  person.lasty = person.y;
  characters.push(person);
}

gameCharacters.createGhost = function() {
  ghost1 = game.add.sprite(CANVAS_WIDTH * Math.random(), CANVAS_HEIGHT * Math.random(), 'sprites');
  ghost1.anchor.setTo(0.5, 0.5);
  ghost1.scale.setTo(1.2,1.2);
  ghost1.userControl = true;
  ghost1.animations.add('right', [0, 1], 0, true);
  ghost1.animations.add('bottom', [14, 15], 0, true);
  ghost1.animations.add('left', [28, 29], 0, true);
  ghost1.animations.add('up', [42, 43], 0, true);
  ghost1.lastx = ghost1.x;
  ghost1.lasty = ghost1.y;

  ghosts.push(ghost1);
  characters.push(ghost1);
}
