function createBoard() {

  platforms = game.add.group();
  platforms.enableBody = true;

  for (var i=0; i < 25; i++) {

    //top border
    var ledge = platforms.create(0+i*32, 0, 'ground');
    ledge.body.immovable = true;

    //left border
    var ledge = platforms.create(0, 25+i*20, 'ground');
    ledge.scale.setTo(1.5, 0.75);
    ledge.body.immovable = true;

    //right border
    var ledge = platforms.create(750, 30+i*20, 'ground');
    ledge.scale.setTo(1.5, 0.75);
    ledge.body.immovable = true;

  }

  for (var i=0; i < 2; i++) {
     //top right box (near border)
    var ledge = platforms.create(i*50+600, 100, 'ground');
    ledge.scale.setTo(1.5, 0.75);
    ledge.body.immovable = true;

     //top left box (near border)
    var ledge = platforms.create(i*50+100, 100, 'ground');
    ledge.scale.setTo(1.5, 0.75);
    ledge.body.immovable = true;

    //bottom right box
    var ledge = platforms.create(i*50+600, 400, 'ground');
    ledge.scale.setTo(1.5, 0.75);
    ledge.body.immovable = true;

    //bottom left box
    var ledge = platforms.create(i*50+100, 400, 'ground');
    ledge.scale.setTo(1.5, 0.75);
    ledge.body.immovable = true;

     //center box
    var ledge = platforms.create(i*50+350, 250, 'ground')
    ledge.scale.setTo(1.5, 0.75);
    ledge.body.immovable = true;

    var ledge = platforms.create(i*50+350, 275, 'ground')
    ledge.scale.setTo(1.5, 0.75);
    ledge.body.immovable = true;
  }

  //inner borders
  for (var i=0; i < 12; i++) {
    //top right border
    var ledge = platforms.create(650, i*25+100, 'ground');
    ledge.scale.setTo(1.5, 0.75);
    ledge.body.immovable = true;

    var ledge = platforms.create(100, i*25+100, 'ground');
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
