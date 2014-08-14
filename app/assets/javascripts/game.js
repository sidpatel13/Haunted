console.log("Hello");

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('ghost', '/ghost.png');
  game.load.image('person', '/person.png')
}

var person;
var ghost1; var ghost2; var ghost3; var ghost4;
var key1; var key2; var key3; var key4;
var walls;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Create group for walls and enable physics
    
    // walls = game.add.group();
    // walls.enableBody = true;
    
    // Create person.

    person = game.add.sprite(1, game.world.height - 150, 'person');
    person.scale.setTo(0.5,0.5);
    person.anchor.setTo(0.5, 0.5);

    // Create ghost 1.

    ghost1 = game.add.sprite(100, game.world.height - 150, 'ghost');
    ghost1.anchor.setTo(0.5, 0.5);
    ghost1.scale.setTo(2,2);

    // Create hotkeys.

    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);

    //  Enable physics for sprites, make world boundaries.
    
    game.physics.arcade.enable([person, ghost1]);
    person.body.collideWorldBounds = true;
    ghost1.body.collideWorldBounds = true;

    // Toggle between characters
}

// function toggleBody() {
//   if (person.body.enable) {
  
// }

function update() {

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { 
    person.x -= 4;
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    person.x += 4;
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    person.y -= 4;
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    person.y +=4;
  }

  game.physics.arcade.collide(ghost1, person);

}