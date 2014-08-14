console.log("Hello");

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// function preload() {
//     game.load.image('sky', 'images/sky.png');
//     game.load.image('ground', 'assets/images/platform.png');
//     game.load.image('star', 'assets/images/star.png');
//     game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
// }

// function create() {
// }

// function update() {
// }