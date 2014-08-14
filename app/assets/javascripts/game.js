console.log("Hello");

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('ghost', '/ghost.png');
}

var ghost1;
var walls;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The walls group contains the ground and the 2 ledges we can jump on
    walls = game.add.group();

    //  We will enable physics for any object that is created in this group
    walls.enableBody = true;

    ghost1 = game.add.sprite(32, game.world.height - 150, 'ghost');
    ghost1.anchor.setTo(0.5, 0.5);
    ghost1.scale.setTo(2,2);

    //  Enable physics library for ghost1, make world boundaries.
    game.physics.arcade.enable(ghost1);
    ghost1.body.collideWorldBounds = true;

}

function update() {

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { 
    ghost1.x -= 4;
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    ghost1.x += 4;
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    ghost1.y -= 4;
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    ghost1.y +=4;
  }
}