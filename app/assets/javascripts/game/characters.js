var characters = {};

characters.createCharacters = function() {
  characters.createPerson();
  characters.createGhost();
}

characters.createPerson = function() {
  person = game.add.sprite(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 'sprites');
  person.scale.setTo(1, 1);
  person.anchor.setTo(0.5, 0.5);
  person.userControl = false;
  person.animations.add('right', [10, 11], 0, true);
  person.animations.add('bottom', [24, 25], 0, true);
  person.animations.add('left', [38, 39], 0, true);
  person.animations.add('up', [52, 53], 0, true);
  person.cherry = false;
  person.speedMultiplyer = 1;
  person.lastx = person.x;
  person.lasty = person.y;
}

characters.createGhost = function() {
  ghost = game.add.sprite(70, 70, 'sprites');
  ghost.scale.setTo(1,1);
  ghost.anchor.setTo(0.5, 0.5);
  ghost.userControl = true;
  ghost.animations.add('right', [0, 1], 0, true);
  ghost.animations.add('bottom', [14, 15], 0, true);
  ghost.animations.add('left', [28, 29], 0, true);
  ghost.animations.add('up', [42, 43], 0, true);
  ghost.speedMultiplyer = 1;
  ghost.lastx = ghost.x;
  ghost.lasty = ghost.y;
}
