console.log("Hello");

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('ghost', '/ghost.png');
  game.load.image('person', '/person.png')
}

var person;
var ghost1; var ghost2; var ghost3; var ghost4;
var ghosts;
var key1; var key2; var key3; var key4;
var platforms;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    platforms = game.add.group();

    platforms.enableBody = true;

    for (var i=0; i < 25; i++) {

      //top border
      ledge = platforms.create(0+i*32, 0, 'platform');
      ledge.body.immovable = true;

      //left border
      ledge = platforms.create(0, 25+i*20, 'platform');
      ledge.scale.setTo(1.5, 0.75);
      ledge.body.immovable = true;

       //right border
      ledge = platforms.create(750, 30+i*20, 'platform');
      ledge.scale.setTo(1.5, 0.75);
      ledge.body.immovable = true;

    }

    for (var i=0; i < 2; i++) {
       //top right box (near border)
      ledge = platforms.create(i*50+600, 100, 'platform');
      ledge.scale.setTo(1.5, 0.75);
      ledge.body.immovable = true;

       //top left box (near border)
      ledge = platforms.create(i*50+100, 100, 'platform');
      ledge.scale.setTo(1.5, 0.75);
      ledge.body.immovable = true;

      //bottom right box
      ledge = platforms.create(i*50+600, 400, 'platform');
      ledge.scale.setTo(1.5, 0.75);
      ledge.body.immovable = true;

      //bottom left box
      ledge = platforms.create(i*50+100, 400, 'platform');
      ledge.scale.setTo(1.5, 0.75);
      ledge.body.immovable = true;

       //center box
      ledge = platforms.create(i*50+350, 250, 'platform')
      ledge.scale.setTo(1.5, 0.75);
      ledge.body.immovable = true;

      ledge = platforms.create(i*50+350, 275, 'platform')
      ledge.scale.setTo(1.5, 0.75);
      ledge.body.immovable = true;


    }

    //inner borders
    for (var i=0; i < 12; i++) {
      //top right border
      ledge = platforms.create(650, i*25+100, 'platform');
      ledge.scale.setTo(1.5, 0.75);
      ledge.body.immovable = true;

      ledge = platforms.create(100, i*25+100, 'platform');
      ledge.scale.setTo(1.5, 0.75);
      ledge.body.immovable = true;

    }

    // Create person.

    person = game.add.sprite(1, game.world.height - 150, 'person');
    person.scale.setTo(0.5, 0.5);
    person.anchor.setTo(0.5, 0.5);

    // Create ghosts.

    ghost1 = game.add.sprite(100, game.world.height - 150, 'ghost');
    ghost1.anchor.setTo(0.5, 0.5);
    ghost1.scale.setTo(2,2);

    ghost2 = game.add.sprite(200, game.world.height - 150, 'ghost');
    ghost2.anchor.setTo(0.5, 0.5);
    ghost2.scale.setTo(2,2)

    ghost3 = game.add.sprite(300, game.world.height - 150, 'ghost');
    ghost3.anchor.setTo(0.5, 0.5);
    ghost3.scale.setTo(2,2)

    ghost4 = game.add.sprite(400, game.world.height - 150, 'ghost');
    ghost4.anchor.setTo(0.5, 0.5);
    ghost4.scale.setTo(2,2)

    ghosts = [ghost1, ghost2, ghost3, ghost4];

    //  Enable physics for sprites, make world boundaries.

    game.physics.arcade.enable([person, ghost1, ghost2, ghost3, ghost4]);
    person.body.collideWorldBounds = true;
    ghost1.body.collideWorldBounds = true;
    ghost2.body.collideWorldBounds = true;
    ghost3.body.collideWorldBounds = true;
    ghost4.body.collideWorldBounds = true;

    // Make ghosts inactive by default.

    ghosts.forEach(function(item) { item.body.enable = false; });

    // Create hotkeys.

    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);

    key1.onDown.add(function() { makeActive(1), makeInactive([2, 3, 4])} );
    key2.onDown.add(function() { makeActive(2), makeInactive([1, 3, 4])} );
    key3.onDown.add(function() { makeActive(3), makeInactive([1, 2, 4])} );
    key4.onDown.add(function() { makeActive(4), makeInactive([1, 2, 3])} );
}

function update() {

  if (person.body.enable == true) {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      person.x -= 4;
      returnCoordinates(person);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      person.x += 4;
      returnCoordinates(person);
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      person.y -= 4;
      returnCoordinates(person);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      person.y +=4;
      returnCoordinates(person);
    }
  }

  ghosts.forEach(function(item) {
      if (item.body.enable == true) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
          item.x -= 4;
          returnCoordinates(item);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
          item.x += 4;
          returnCoordinates(item);
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
          item.y -= 4;
          returnCoordinates(item);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
          item.y +=4;
          returnCoordinates(item);
        }
      }
  });

}

function makeActive(hotkey) {
  ghosts[(hotkey - 1)].body.enable = true;
};

function makeInactive(hotkeys) {
  hotkeys.forEach(function(item) {
    ghosts[(item - 1)].body.enable = false;
  })
};

function returnCoordinates(sprite) {
  var coordinates = [sprite.x, sprite.y];
  console.log(coordinates);
  return coordinates;
}