let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    pixelArt: true,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, keyFF, keyESC, keyLEFT2, keyRIGHT2;