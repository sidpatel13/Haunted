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
var walls;

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
    ghost2.scale.setTo(2,2);

    ghosts = game.add.group(ghost1, ghost2);

    //  Enable physics for sprites, make world boundaries.

    game.physics.arcade.enable([person, ghost1]);
    person.body.collideWorldBounds = true;
    ghost1.body.collideWorldBounds = true;

    // Create hotkeys.

    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);

    key1.onDown.add(function() { makeActive(1) } );
    key2.onDown.add(function() { makeActive(2) } );
    key3.onDown.add(function() { makeActive(3) } );
    key4.onDown.add(function() { makeActive(4) } );

    //this.game.input.onDownCallback = function(e) { console.log('more tests')};

    // this.game.input.keyboard.onDownCallback = function(e) {
    //   if (e.keyCode == 49)
    //     console.log("this is key 1");
    //   else if (e.keyCode == 50)
    //     console.log("this is key 2");
    //   else if (e.keyCode == 51)
    //     console.log("this is key 3");
    //   else (e.keyCode == 52)
    //     console.log("this is key 4");
    //   else
    //     console.log("not a hot key");
    // };
}

// Make one ghost active and the others inactive.

function makeActive(hotkey) {
  console.log("You've selected " + hotkey)
  for (var i = 1; i <= 4; i++) {
    if (i === hotkey) {
      person.body.enable = false;
    }
    else {
      console.log("You need to disable these.")
      // .body.enable = false;
    }
  };
}

function update() {

  if (person.body.enable == true) {
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
  }


}
