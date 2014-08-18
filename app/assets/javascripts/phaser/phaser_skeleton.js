//= require phaser/phaser.min.js
//= require game/board.js
//= require game/game_characters.js
//= require game/controls.js
//= require game/images.js
//= require game/game_pieces.js
//= require game/features.js

var game = new Phaser.Game( 800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update } );

//preload images to use as icons in the game
function preload() {
  loadImages();
};

var characters = [], dots = [], ghosts = [];
var person, ghost1, ghost2, ghost3, ghost4, platforms, scoreText, livesText, key1, key2, key3, key4, starOne, starTwo, group;
var score = 0, maxScore = 20, lives = 3;


//create sprites (game icons) to be used during game play
function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

  createBoard();
  gameCharacters.createPerson();
  gameCharacters.createGhosts();
  controls.createHotkeys();
  gamePieces.createTeleport();
  gamePieces.createMultipleDots(10);

  //  Enable physics for sprites, make world boundaries.

  var gamePhysicsArray = [characters, dots, starOne, starTwo];
  for (var i = 0; i < gamePhysicsArray.length; i++) {
    game.physics.arcade.enable(gamePhysicsArray[i]);
  }

  characters.forEach( function( character ) { character.body.collideWorldBounds = true; })

  //might want to refactor this and use cursor keys
  key1.onDown.add( function() { gameCharacters.setUserControl(ghosts, 1) } );
  key2.onDown.add( function() { gameCharacters.setUserControl(ghosts, 2) } );
  key3.onDown.add( function() { gameCharacters.setUserControl(ghosts, 3) } );
  key4.onDown.add( function() { gameCharacters.setUserControl(ghosts, 4) } );

  scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
  livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });

  cursors = game.input.keyboard.createCursorKeys();


} // End create()



//create in game functionality such as collisions and updating locations of sprites
function update() {

  // game.physics.overlap(person.sprite, platforms, collisionHandler, null, this);
  game.physics.arcade.collide(person, platforms);


  game.physics.arcade.collide(person, walls, collisionHandler, null, this);
  //game.physics.arcade.collide(group, group);

  function collisionHandler(person, veg) {

  }


  game.physics.arcade.overlap(person, ghosts, features.loseLife, null, this);
  game.physics.arcade.overlap(person, dots, eatDot, null, this);
  game.physics.arcade.overlap(person, starOne, features.teleportOne, null, this);
  game.physics.arcade.overlap(person, starTwo, features.teleportTwo, null, this);

  if (person.powerUp == true){ // there is no attrb for powerUp yet)
    game.physics.arcade.overlap(person, ghosts, eatGhosts, null, this);
  }
  else {
    game.physics.arcade.overlap(person, ghosts, features.loseLife, null, this);
  }

  characters.forEach(function(character) {
    if (character.userControl === true) {
      if (cursors.left.isDown){
        person.body.velocity.x = -200;
        person.body.velocity.y = 0;
      } else if (cursors.right.isDown){
        person.body.velocity.x = 200;
        person.body.velocity.y = 0;
      } else if (cursors.up.isDown){
        person.body.velocity.y = -200;
        person.body.velocity.x = 0;
      } else if (cursors.down.isDown) {
        person.body.velocity.y = 200;
        person.body.velocity.x = 0;
      }
    }

    // game.physics.arcade.collide(person.sprite, platforms);

  });

}



function returnCoordinates(sprite) {
  var coordinates = [sprite.x, sprite.y];
  return coordinates;
}

function eatDot (person, dots) {
  dots.kill();
  score++;
  scoreText.text = 'score: ' + score;
  if (score === maxScore) {
    gameOver("Player 1");
  }
}

function eatGhosts (person, ghosts) {
  ghosts.kill();
}





