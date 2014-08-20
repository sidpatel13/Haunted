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
VELOCITY = 200;

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

  $("#instructions-button").click(modals.instructions);

  $("#aboutus-button").click(modals.aboutUs);

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
  //game.load.audio('music', '/music.mp3');

};

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  board.createBoard();
  characters.createCharacters();

  var gamePhysicsArray = [person, ghost, apples, cherry, speedUp, slowDown, starOne, starTwo];

  for (var i = 0; i < gamePhysicsArray.length; i++) {
    game.physics.arcade.enable(gamePhysicsArray[i]);
  }

  [person, ghost].forEach(function(character){
    character.body.collideWorldBounds = true;
  })

  cursors = game.input.keyboard.createCursorKeys();

}

function update() {

  game.physics.arcade.collide(person,layer);
  game.physics.arcade.collide(ghost,layer);

  board.overlap(person, apples, features.eatApple);
  board.overlap(person, cherry, features.cherry);
  board.overlap(person, speedUp, features.speedUp);
  board.overlap(person, slowDown, features.slowDown);
  board.overlap(ghost, speedUp, features.speedUp);
  board.overlap(ghost, slowDown, features.slowDown);
  board.overlap(person, starOne, features.teleportOne);
  board.overlap(person, starTwo, features.teleportTwo);
  board.overlap(person, ghost, features.pacMeetsGhost);

  livesText.text = 'lives: ' + lives;
  scoreText.text = 'score: ' + score;

  if (currentPlayer === "player1") {
    person.userControl = true;
    features.movePlayer(person);
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
    features.movePlayer(ghost);
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
