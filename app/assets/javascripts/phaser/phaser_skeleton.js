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

var characters = [], dots = [], ghosts = [], powerUp = [], keys = [];
var key1, key2, key3, key4;
var person, ghost1, ghost2, ghost3, ghost4, platforms, scoreText, livesText, starOne, starTwo, group;
var score = 0, maxScore = 20, lives = 4;


//create sprites (game icons) to be used during game play
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  createBoard();
  controls.createHotkeys();
  gameCharacters.createPerson();
  gameCharacters.createGhosts();
  gamePieces.createTeleport();
  gamePieces.createPowerUp();
  gamePieces.createMultipleDots(10);

  //  Enable physics for sprites, make world boundaries.

  var gamePhysicsArray = [characters, dots, powerUp, starOne, starTwo];

  for (var i = 0; i < gamePhysicsArray.length; i++) {
    game.physics.arcade.enable(gamePhysicsArray[i]);
  }

  for (var i = 0; i < characters.length; i++) {
    characters[i].body.collideWorldBounds = true;
  }

  for (var i = 0; i < keys.length; i ++) {
    keys[i].onDown.add( function() { gameCharacters.setUserControl(ghosts, i + 1) } );
  }

  scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
  livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });

  cursors = game.input.keyboard.createCursorKeys();


} // End create()



//create in game functionality such as collisions and updating locations of sprites
function update() {

  game.physics.arcade.collide(person, walls);

  game.physics.arcade.overlap(person, ghosts, features.loseLife, null, this);
  game.physics.arcade.overlap(person, dots, features.eatDot, null, this);
  game.physics.arcade.overlap(person, powerUp, features.powerUp, null, this);
  game.physics.arcade.overlap(person, starOne, features.teleportOne, null, this);
  game.physics.arcade.overlap(person, starTwo, features.teleportTwo, null, this);

  if (person.powerUp == true){
    game.physics.arcade.overlap(person, ghosts, features.eatGhosts, null, this);
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
