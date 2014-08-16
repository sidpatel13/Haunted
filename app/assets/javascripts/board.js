function createBoard() {

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
}

function createDots(count) {
  function createDot() {
    dot = game.add.sprite(Math.random()*800, Math.random()*600, 'diamond');
    dot.anchor.setTo(0.5, 0.5);
    dots.push(dot);
  }

  for(var i=0; i < count; i++){
    createDot();
  }

}

function createTeleport() {
  star1 = game.add.sprite(10, game.world.height - 300, 'star');
  star2 = game.add.sprite(790, game.world.height - 300, 'star');
  star1.anchor.setTo(0.5, 0.5);
  star2.anchor.setTo(0.5, 0.5);
}



