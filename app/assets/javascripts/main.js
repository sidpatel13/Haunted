//= require vendor/phaser.min.js
//= require firebase.js
//= require modals.js
//= require game/board.js
//= require game/characters.js
//= require game/images.js
//= require game/features.js

CANVAS_WIDTH = 833;
CANVAS_HEIGHT = 715;
CANVAS_OFFSET = 60;
MAX_SCORE = 10;
DEFAULT_LIVES = 3;
player1 = false;
player2 = false;
currentPlayer = false;

var score = 0;
var lives = DEFAULT_LIVES;
var apples = [];
var cherry;
var speedUp;
var slowDown;
var person;
var ghost;
var scoreText, livesText;
var starOne, starTwo;
var map;
var layer;
var cursors;
var music;
var fb;
var instructions = 'Here are the rules of the game.<br /><br /><b>Player1:</b><br /><i>'
                 + 'Controls</i> - Move your character with the arrow keys.<br /><i>Objective'
                 + '</i> - Collect all apples and powerups, or eat all the ghosts. The choice'
                 + ' is yours.<br /><br /><b>Player2</b>:<br /><i>Controls</i> - Select which'
                 + ' ghost you want to control by pressing numbers 1 through 4. Then, move your'
                 + ' character with the arrow keys.<br /><i>Objective</i> - Eat the hero until'
                 + ' the hero has no lives left.<br /><br />Need a moment? Press <b>P</b> to'
                 + ' pause and <b>R</b> to resume.';

var aboutUs      = 'Hello! Welcome to <i>Haunted</i>! We are a team of 5 members that are'
                 + ' currently pursuing our passion for coding @ Dev Bootcamp: David Sin, Rootul'
                 + ' Patel, Sid Patel, Cassie Moy, and Julius Jung. We hope you enjoy playing'
                 + 'this game as much as we enjoyed creating it. Check out our <a id="aboutus" '
                 + 'href="https://github.com/red-spotted-newts-2014/haunted">GitHub Repo</a>!';

$(document).ready(function() {
  roomSession = $("#room-session").val();
  if (typeof roomSession !== "undefined") {
    fb = new firebase.firebaseSetup(roomSession);
  }


  $("#instructions-button").click(function(){
    vex.dialog.buttons.YES.text = 'OK';
    vex.dialog.alert(instructions);
  });

  $("#aboutus-button").click(function(){
    vex.dialog.buttons.YES.text = 'OK';
    vex.dialog.alert(aboutUs);
  });

  $("#chat-form").submit(firebase.preMessage);

  fb.chat.on("child_added", firebase.recieveMessage);

  document.onkeydown = function (e) {
    if(e.which == 80) {
      fb.pause.set(true);
    } else if (e.which == 82) {
      fb.pause.set(false);
    }
  }

  fb.pause.on("value", function(snapshot) {
    game.paused = snapshot.val();
  });

  fb.player2.on("value", function(snapshot) {
    if (snapshot.val()) {
      fb.pause.set(false);
    }
  });

  if (fb.player1.val() !== true) { 
    modals.urlModal(roomSession); 
  } else if (fb.player1.val() == true) {
    modals.confirmPlayerModal();
  }

});

var game = new Phaser.Game( CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO, 'pac', { preload: preload, create: create, update: update } );

function preload() {
  
  game.load.tilemap('map', '/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('Desert', '/images/deserttile.png');
  loadImages();
  // game.load.audio('music', '/music.mp3');

};

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  board.createBoard();
  characters.createCharacters();

  var gamePhysicsArray = [person, ghost, apples, cherry, speedUp, slowDown, starOne, starTwo];

  for (var i = 0; i < gamePhysicsArray.length; i++) {
    game.physics.arcade.enable(gamePhysicsArray[i]);
  }

  person.body.collideWorldBounds = true;
  ghost.body.collideWorldBounds = true;
  
  cursors = game.input.keyboard.createCursorKeys();

}

function update() {

  game.physics.arcade.collide(person,layer);
  game.physics.arcade.collide(ghost,layer);
  game.physics.arcade.overlap(person, apples, features.eatApple, null, this);
  game.physics.arcade.overlap(person, cherry, features.cherry, null, this);
  game.physics.arcade.overlap(person, speedUp, features.speedUp, null, this);
  game.physics.arcade.overlap(person, slowDown, features.slowDown, null, this);
  game.physics.arcade.overlap(ghost, speedUp, features.speedUp, null, this);
  game.physics.arcade.overlap(ghost, slowDown, features.slowDown, null, this);
  game.physics.arcade.overlap(person, starOne, features.teleportOne, null, this);
  game.physics.arcade.overlap(person, starTwo, features.teleportTwo, null, this);
  game.physics.arcade.overlap(person, ghost, features.pacMeetsGhost, null, this);

  livesText.text = 'lives: ' + lives;
  scoreText.text = 'score: ' + score;

  var movePlayer = function(character) {
    if (cursors.left.isDown || pointer('left')){
      character.body.velocity.x = -200 * character.speedMultiplyer;
      character.body.velocity.y = 0;
      character.animations.play('left', 10, true);
    } else if (cursors.right.isDown || pointer('right')){
      character.body.velocity.x = 200 * character.speedMultiplyer;
      character.body.velocity.y = 0;
      character.animations.play('right', 10, true);
    } else if (cursors.up.isDown || pointer('up')){
      character.body.velocity.y = -200 * character.speedMultiplyer;
      character.body.velocity.x = 0;
      character.animations.play('up', 10, true);
    } else if (cursors.down.isDown || pointer('down')) {
      character.body.velocity.y = 200 * character.speedMultiplyer;
      character.body.velocity.x = 0;
      character.animations.play('bottom', 10, true);
    }
  }

  var pointer = function(direction) {
    if (game.input.activePointer.isDown) {
      if (direction === "up") {
        if (game.input.activePointer.y < 200) {
          return true;
        }
      } else if (direction === "down") {
        if (game.input.activePointer.y > 600) {
          return true;
        }
      } else if (direction === "left") {
        if (game.input.activePointer.x < 200) {
          return true;
        }
      } else if (direction === "right") {
        if (game.input.activePointer.x > 600) {
          return true;
        }
      }
    }
    return false;
  }

  if (currentPlayer === "player1") {
    person.userControl = true;
    movePlayer(person);
    if ((person.x !== person.lastx) || (person.y !== person.lasty )) {
      fb.person.set({
        x : person.position.x,
        y : person.position.y
      });
    }

    fb.ghost.on("value", function(snapshot) {
      ghost.x = snapshot.val().x
      ghost.y = snapshot.val().y
    });
  }

  if (currentPlayer === "player2") {
    movePlayer(ghost);
    if ((ghost.x !== ghost.lastx) || (ghost.y !== ghost.lasty )) {
      fb.ghost.set({
        x : ghost.position.x,
        y : ghost.position.y
      });
    }

    fb.person.on("value", function(snapshot) {
      person.x = snapshot.val().x
      person.y = snapshot.val().y
    });
  }
}
