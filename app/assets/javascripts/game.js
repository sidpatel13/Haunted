//= require ./phaser.min.js
//= require ./board.js
//= require ./characters.js
//= require ./hotkeys.js
//= require ./images.js

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  loadImages();
}

var characters = []; //Pacman + All Ghosts
var ghosts = []; //All Ghosts
var person; //Pacman
var ghost1, ghost2, ghost3, ghost4; //Individual Ghosts
var dots = []; //All Dots
var platforms;
var score = 0;
var maxScore = 20;
var scoreText;
var lives = 3;
var livesText;
var key1, key2, key3, key4;
var starOne;
var starTwo;
var group;

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

  createBoard();
  createPerson();
  //createGhosts();
  createHotkeys();
  createTeleport();
  createDots(10);

  //  Enable physics for sprites, make world boundaries.
  game.physics.arcade.enable(characters);
  game.physics.arcade.enable(dots);
  game.physics.arcade.enable(starOne);
  game.physics.arcade.enable(starTwo);

  characters.forEach(function(character) { character.body.collideWorldBounds = true; });

  key1.onDown.add(function() { setUserControl(ghosts, 1) });
  key2.onDown.add(function() { setUserControl(ghosts, 2) });
  key3.onDown.add(function() { setUserControl(ghosts, 3) });
  key4.onDown.add(function() { setUserControl(ghosts, 4) });

  scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
  livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });

  cursors = game.input.keyboard.createCursorKeys();


} // End create()


function update() {

  game.physics.arcade.collide(person, walls, collisionHandler, null, this);
  //game.physics.arcade.collide(group, group);

  function collisionHandler(person, veg) {

  }


  game.physics.arcade.overlap(person, ghosts, loseLife, null, this);
  game.physics.arcade.overlap(person, dots, eatDot, null, this);
  game.physics.arcade.overlap(person, starOne, teleportOne, null, this);
  game.physics.arcade.overlap(person, starTwo, teleportTwo, null, this);

  if (person.powerUp == true){ // there is no attrb for powerUp yet)
    game.physics.arcade.overlap(person, ghosts, eatGhosts, null, this);
  }
  else {
    game.physics.arcade.overlap(person, ghosts, loseLife, null, this);
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
  });

}

function returnCoordinates(sprite) {
  var coordinates = [sprite.x, sprite.y];
  return coordinates;
}

function loseLife (person, ghosts) {
  person.kill();
  lives--;
  livesText.text = 'lives: ' + lives;
  if (lives === 0) {
    gameOver("Player 2");
  } else {
    person.reset(100, 100);
  }
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

function gameOver (winner) {
  //Give user and opponent modal to restart / congratulate winner
  console.log("game over winner: " + winner);
}

function teleportOne (person, starOne) {
  person.kill();
  person.reset(746,300);
}

function teleportTwo (person, starTwo) {
  person.kill();
  person.reset(56,300);
}


