function createImage(name) {
  var location = "./" + name + ".png";
  game.load.image(name, location)
}

function loadImages() {
  createImage("ghost");
  createImage("person");
  createImage("star");
  createImage("firstaid");
  createImage("diamond");
};
