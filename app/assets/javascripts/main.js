//= require vendor/phaser.min.js
//= require firebase.js
//= require game/board.js
//= require game/characters.js
//= require game/images.js
//= require game/features.js

// Constants
CANVAS_WIDTH = 833;
CANVAS_HEIGHT = 715;
CANVAS_OFFSET = 60;
MAX_SCORE = 10;
DEFAULT_LIVES = 3;
player1 = false;
player2 = false;
currentPlayer = false;

// Variables
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

$(document).ready(function() {
  var roomSession = $("#room-session").val();
  if (typeof roomSession !== "undefined") {
    fb = new firebase.firebaseSetup(roomSession);
  }

  // Recieve a message
  fb.chat.on("child_added", firebase.recieveMessage);

  // Send a message
  $("#chat-form").submit(function(event) {
    event.preventDefault();
    var name = $("#user-name").val()
    var content = $("#msg-input").val()
    $("#msg-input").val("");
    firebase.sendMessage(fb, name, content);
  });

  $("#instructions-button").click(function(){
    vex.dialog.buttons.YES.text = 'OK';
    vex.dialog.alert('Here are the rules of the game.<br /><br /><b>Player1:</b><br /><i>Controls</i> - Move your character with the arrow keys.<br /><i>Objective</i> - Collect all apples and powerups, or eat all the ghosts. The choice is yours.<br /><br /><b>Player2</b>:<br /><i>Controls</i> - Select which ghost you want to control by pressing numbers 1 through 4. Then, move your character with the arrow keys.<br /><i>Objective</i> - Eat the hero until the hero has no lives left.<br /><br />Need a moment? Press <b>P</b> to pause and <b>R</b> to resume.');
  });

  $("#aboutus-button").click(function(){
    vex.dialog.buttons.YES.text = 'OK';
    vex.dialog.alert('Hello! Welcome to <i>Haunted</i>! We are a team of 5 members that are currently pursuing our passion for coding @ Dev Bootcamp: David Sin, Rootul Patel, Sid Patel, Cassie Moy, and Julius Jung. We hope you enjoy playing this game as much as we enjoyed creating it. Check out our blog @ https://github.com/red-spotted-newts-2014/haunted !');
  });

  var urlModal = function() {
    vex.dialog.alert({
      message:'Send your friend this url to play!<br><input id="game-url" type="text" value="http://haunted-game.herokuapp.com/' + roomSession + '">',
      callback: function() {
        confirmPlayerModal();
      }
    });
  }

 var confirmPlayerModal = function() {
    vex.dialog.buttons.YES.text = 'Hero';
    vex.dialog.buttons.NO.text = 'Ghost';
    vex.dialog.confirm({
      message: "Are you hero or ghost?",
      callback: function(value) {
        if (value) {
          currentPlayer = "player1";
          fb.player1.set(true);     
        } else {
          currentPlayer = "player2";
          fb.player2.set(true);
        }
      }
    });
  }

  fb.pause.on("value", function(snapshot) {
    game.paused = snapshot.val();
  });

  fb.player2.on("value", function(snapshot) {
    if (snapshot.val()) {
      fb.pause.set(false);
    }
  });

  urlModal();
});

var game = new Phaser.Game( CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO, 'pac', { preload: preload, create: create, update: update } );

function preload() {
  loadImages();
  game.load.tilemap('map', '/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('Desert', '/images/deserttile.png');
  game.load.audio('music', '/music.mp3');
};

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  fb.pause.set(true);

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
    if (cursors.left.isDown){
      character.body.velocity.x = -200 * character.speedMultiplyer;
      character.body.velocity.y = 0;
      character.animations.play('left');
    } else if (cursors.right.isDown){
      character.body.velocity.x = 200 * character.speedMultiplyer;
      character.body.velocity.y = 0;
      character.animations.play('right');
    } else if (cursors.up.isDown){
      character.body.velocity.y = -200 * character.speedMultiplyer;
      character.body.velocity.x = 0;
      character.animations.play('up');
    } else if (cursors.down.isDown) {
      character.body.velocity.y = 200 * character.speedMultiplyer;
      character.body.velocity.x = 0;
      character.animations.play('bottom');
    }
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
