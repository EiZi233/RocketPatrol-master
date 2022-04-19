/*
Name: Ziyi Yu
Project: NOT Rocket Patrol (nor Touhou)
date: 04/17/2022
How long it took?: 10 hours at least

Point Breakdown:
-Implement a simultaneous two-player mode (30):
    Two Player mode is implented and avalible to pick at the mian menu. two players have different controls and different scores.

-Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60):
    The whole game is redesigned as Touhou theme following it's PC-98 aesthetic.

-Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20):
    each hit adds 1 second to the clock.

-Implement parallax scrolling (10)

-Implement a pause menu (10)

-Add your own (copyright-free) background music to the Play scene (5)

credit: SFX from Ryannlib.
*/

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