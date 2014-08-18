// var character = {};
// character.createPerson

var gamePieces = {};

gamePieces.createPerson = function() {
  var person = game.add.sprite(100, game.world.height - 150, 'person');
  person.scale.setTo(0.5, 0.5);
  person.anchor.setTo(0.5, 0.5);
  person.userControl = true;
  characters.all.push(person);
}

// function createPerson() {
//   person = game.add.sprite(100, game.world.height - 150, 'person');
//   person.scale.setTo(0.5, 0.5);
//   person.anchor.setTo(0.5, 0.5);
//   person.userControl = true;
//   characters.push(person);
// }

function createGhosts() {

  //ghosts = game.add.group();
  //ghosts.enableBody = true;

  ghost1 = game.add.sprite(100, game.world.height - 100, 'ghost');
  ghost1.anchor.setTo(0.5, 0.5);
  ghost1.scale.setTo(2,2);
  ghost1.isControlled = true;

  ghost2 = game.add.sprite(200, game.world.height - 150, 'ghost');
  ghost2.anchor.setTo(0.5, 0.5);
  ghost2.scale.setTo(2,2);
  ghost2.isControlled = true;

  ghost3 = game.add.sprite(300, game.world.height - 150, 'ghost');
  ghost3.anchor.setTo(0.5, 0.5);
  ghost3.scale.setTo(2,2);
  ghost3.isControlled = true;

  ghost4 = game.add.sprite(400, game.world.height - 150, 'ghost');
  ghost4.anchor.setTo(0.5, 0.5);
  ghost4.scale.setTo(2,2);
  ghost4.isControlled = true;

  ghosts.push(ghost1, ghost2, ghost3, ghost4);
  characters.push(ghost1, ghost2, ghost3, ghost4);
}

function setUserControl(ghosts, ghostNumber) {
  for(var i=0; i < ghosts.length; i++) {
    if (i === (ghostNumber -1)) {
      ghosts[i].userControl = true;
    } else {
      ghosts[i].userControl = false;
    }
  }
}
