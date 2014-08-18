//= require phaser/phaser.min.js
//= require game/board.js
//= require game/game_characters.js
//= require game/controls.js
//= require game/images.js
//= require game/game_pieces.js
//= require game/features.js

var game = new Phaser.Game(833, 715, Phaser.AUTO, 'phaser-game', { preload: preload, create: create, update: update, render: render});

function preload() {
  game.load.tilemap('map', '/fart.json', null, Phaser.Tilemap.TILED_JSON);
  // game.load.image('grassdirt', '/grass-tiles-2-small.png');
  // game.load.image('shrooms', '/littleshrooms_0.png');
  game.load.image('Desert', '/deserttile.png');
  // game.load.image('person', '/person.png');

}

var map;
var layer;
// var person;
var cursors;


function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // game.stage.backgroundColor = '90EE90'
  map = game.add.tilemap('map');
  map.addTilesetImage('Desert');

var tile = map.getTileWorldXY(x, y, undefined, undefined, 'objectlayer1 ');
  if(tile != null)
  {
     // the tileset index
     var index = map.getTilesetIndex('your-tileset-name-in-json');
     // null = no such tileset
     if(index != null)
     {
        var tileset = map.tilesets[index];
        // finally you can grab the props of your tile - mind that Phaser.Tile.index starts with 1; however tileProperties start with 0;
        var tileProps = tileset.tileProperties[tile.index-1];
     }
  }
  // map.setCollisionBetween(13, 14);
  // map.setCollisionBetween(39, 40);
  // map.setCollisionBetween(65, 66);
  // map.setCollisionBetween(91, 92);
  // map.setCollisionBetween(117, 118);
  // map.setCollisionBetween(143, 144);

  // map.setCollision(118);

  layer = map.createLayer('Ground');
  layer.resizeWorld();

  person = game.add.sprite(40, 40, 'person');
  person.anchor.setTo(0.5, 0.5);
  person.scale.setTo(0.3,.3);

  game.physics.arcade.enable(person);
  person.body.collideWorldBounds = true;

  // map.addTilesetImage('tree');



  cursors = game.input.keyboard.createCursorKeys();



  // console.log(layer)

  // console.log(map)
  // map.addTilesetImage('shrooms');
  //
  // map.addTilesetImage('tree');
  // layer = map.createLayer('grasslevel');
  // layer2 = map.createLayer('treeandshroomlevel');
  // layer3 = map.createLayer('toplevel');
  // game.resizeWorld();
  // map.setCollisionBetween(0, 100)

}

function update() {
  game.physics.arcade.collide(person, layer);

  // if (cursors.up.isUp){
  //   person.body.velocity.y = 150;
  // }
  // else if (cursors.left.isLeft){
  //   person.body.velocity.x = -150;
  // }
  // else if (cursors.right.isRight){
  //   person.body.velocity.x = 150;
  // }
  // else if (cursors.down.isDown){
  //   person.body.velocity.y = -150
  // }

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



// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

// function preload() {

//     game.load.image('phaser', 'assets/sprites/phaser-dude.png');
//     game.load.spritesheet('veggies', 'assets/sprites/fruitnveg32wh37.png', 32, 32);

// }

// var sprite;
// var group;
// var cursors;

// function create() {

//     game.physics.startSystem(Phaser.Physics.ARCADE);

//     game.stage.backgroundColor = '#2d2d2d';

//     //  This example will check Sprite vs. Group collision

//     sprite = game.add.sprite(32, 200, 'phaser');
//     sprite.name = 'phaser-dude';

//     game.physics.enable(sprite, Phaser.Physics.ARCADE);

//     group = game.add.group();
//     group.enableBody = true;
//     group.physicsBodyType = Phaser.Physics.ARCADE;

//         var c = group.create(game.rnd.integerInRange(100, 770), game.rnd.integerInRange(0, 570), 'veggies', game.rnd.integerInRange(0, 35));
//         c.name = 'veg';
//         c.body.immovable = true;



//     cursors = game.input.keyboard.createCursorKeys();

// }

// function update() {

//     game.physics.arcade.collide(sprite, group, collisionHandler, null, this);
//     game.physics.arcade.collide(group, group);

//     sprite.body.velocity.x = 0;
//     sprite.body.velocity.y = 0;

//     if (cursors.left.isDown)
//     {
//         sprite.body.velocity.x = -200;
//     }
//     else if (cursors.right.isDown)
//     {
//         sprite.body.velocity.x = 200;
//     }

//     if (cursors.up.isDown)
//     {
//         sprite.body.velocity.y = -200;
//     }
//     else if (cursors.down.isDown)
//     {
//         sprite.body.velocity.y = 200;
//     }

// }

// function collisionHandler (player, veg) {

//     //  If the player collides with the chillis then they get eaten :)
//     //  The chilli frame ID is 17

//     if (veg.frame == 17)
//     {
//         veg.kill();
//     }

// }

/////////////////////////

