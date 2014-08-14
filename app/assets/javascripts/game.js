console.log("Hello");

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('ghost', '/ghost.png');
  game.load.image('sky', '/sky.png');
  game.load.image('ground', '/platform.png');
  game.load.image('star', '/star.png');
}

var ghost1;
var platforms;
var cursors;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    ghost1 = game.add.sprite(32, game.world.height - 150, 'ghost');
    ghost1.anchor.setTo(0.5, 0.5);
    ghost1.scale.setTo(2,2);

    //  We need to enable physics on the player
    //game.physics.arcade.enable(ghost1);

    //  Player physics properties. Give the little guy a slight bounce.
    // player.body.bounce.y = 0.2;
    //ghost1.body.gravity.y = 300;
    //ghost1.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    // player.animations.add('left', [0, 1, 2, 3], 10, true);
    // player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

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







