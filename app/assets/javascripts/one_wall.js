//= require ./phaser.min.js

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser-dude.png');
    game.load.spritesheet('veggies', 'assets/sprites/fruitnveg32wh37.png', 32, 32);

}

var sprite;
var group;
var cursors;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    //  This example will check Sprite vs. Group collision

    sprite = game.add.sprite(32, 200, 'phaser');
    sprite.name = 'phaser-dude';

    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    group = game.add.group();
    group.enableBody = true;
    group.physicsBodyType = Phaser.Physics.ARCADE;

        var c = group.create(game.rnd.integerInRange(100, 770), game.rnd.integerInRange(0, 570), 'veggies', game.rnd.integerInRange(0, 35));
        c.name = 'veg';
        c.body.immovable = true;



    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    game.physics.arcade.collide(sprite, group, collisionHandler, null, this);
    game.physics.arcade.collide(group, group);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = 200;
    }

    if (cursors.up.isDown)
    {
        sprite.body.velocity.y = -200;
    }
    else if (cursors.down.isDown)
    {
        sprite.body.velocity.y = 200;
    }

}

function collisionHandler (player, veg) {

    //  If the player collides with the chillis then they get eaten :)
    //  The chilli frame ID is 17

    if (veg.frame == 17)
    {
        veg.kill();
    }

}
